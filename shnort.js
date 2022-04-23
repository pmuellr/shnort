import { Runtime, Inspector, Library } from './vendor/observablehq/runtime.js'
export { Runtime, Inspector, Library } from './vendor/observablehq/runtime.js'

const DefaultLibrary = {
  ...new Library(),
  loadNote: () => loadNote,
}
const DefaultRuntime = new Runtime(DefaultLibrary)

/** @type { (url: string, container: Element, selector: string) => Promise<any> } */
export async function loadNote(url, containerEl, selector) {
  if (!containerEl) throw new Error(`container not supplied`)
  const targetEl = containerEl.querySelector(selector)
  if (!targetEl) throw new Error(`selector not found: "${selector}"`)

  const noteExports = await import(url) || { noExports: 'no exports from module' }

  const layout = getLayout(noteExports)
  targetEl.innerHTML = layout

  const vars = Object.keys(noteExports)
    .filter(key => !key.startsWith('$'))
  
  const observerFactory = getObserverFactory(targetEl)
  const noteModule = new NoteModule(observerFactory)

  noteModule.addVariable('$el', targetEl)

  for (const varName of vars) {
    const varValue = noteExports[varName]
    const [ type, name ] = getTypeNameFromName(varName)

    switch(type) {
      case 'Variable': 
        noteModule.addVariable(name, varValue)
        break
      case 'View': 
        noteModule.addViewOf(name, varValue)
        break
      case 'Mutable':
        noteModule.addMutable(name, varValue) 
        break
      default: 
        throw new Error(`unexpected export type ${type}`)
    }
  }

  return noteModule
}

class NoteModule {
  constructor (observerFactory) {
    this.library = {
      ...new Library(),
      loadNote: () => loadNote,
    }
    this.runtime = new Runtime(this.library)
    this.module = this.runtime.module()
    this.observerFactory = observerFactory
  }

  /** @type { (name: string, value: any) => void } */
  addVariable (name, value) {
    let params = []
    if (typeof value === 'function') {
      params = getFnParams(value)
    }

    const variable = this.module.variable(this.observerFactory(name))
    variable.define(name, params, value)
  }

  /** @type { (name: string, fn: any) => void } */
  addViewOf (name, fn) {
    const viewName = `${name}_view`
    const params = getFnParams(fn)

    const variable = this.module.variable(this.observerFactory(name))
    const viewVariable = this.module.variable(this.observerFactory(viewName))

    viewVariable.define(viewName, params, fn)
    variable.define(
      name, 
      [ 'Generators', viewName ], 
      (Generators, viewVariable) => Generators.input(viewVariable)
    )
  }

  /** @type { (name: string, initialValue: any) => void } */
  addMutable (name, initialValue) {
    const mutableName = `${name}_mutable`

    const variable = this.module.variable(this.observerFactory(name))
    const mutableVariable = this.module.variable(this.observerFactory(mutableName))

    mutableVariable.define(
      mutableName,
      [ 'Mutable' ],
      Mutable => new Mutable(initialValue)
    )

    variable.define(
      name, 
      [ mutableName ],
      mutable => mutable.generator
    )
  }
}

/** @type {(name) => [ string, string ]} */
function getTypeNameFromName(name) {
  let match

  match = name.match(/^(.*)_view$/)
  if (match) return ['View', match[1]]

  match = name.match(/^(.*)_mutable$/)
  if (match) return ['Mutable', match[1]]

  return ['Variable', name]
}

/** @type { (fn: Function) => string[] } */
function getFnParams (fn) {
  const fnString = `${fn}`.replace(/\n/g, ' ')
  const params = fnString
    .match(/.*?\((.*?)\)/)[1]
    .split(/,/g)
    .map(param => param.trim())

  if (params.length === 1 && params[0] === '') {
    return []
  }
  return params
}

/** @type { (containerEl: Element) => ((variableName: string) => Inspector) } */
function getObserverFactory(containerEl) {
  return observer

  /** @type { (variableName: string) => Inspector } */
  function observer(variableName) {
    if (variableName.startsWith('$')) return
    const el = containerEl.querySelector(`.${variableName}`) || document.createElement('div')

    return new Inspector(el)
  }
}

/** @type { (exports: any) => string } */
function getLayout(exports) {
  if (exports && typeof exports.$layout === 'string') {
    return exports.$layout
  }

  const keys = Object.keys(exports)
  return keys.map(key => `<div class="${key}">`).join('\n')
}
