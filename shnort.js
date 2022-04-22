//@ts-ignore
import { Runtime, Inspector, Library } from 'https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js'
// @ts-ignore
import * as Inputs                     from 'https://cdn.jsdelivr.net/npm/@observablehq/inputs@0/src/index.js'
//@ts-ignore
export { Runtime, Inspector, Library } from 'https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js'
//@ts-ignore
export * as Inputs                     from 'https://cdn.jsdelivr.net/npm/@observablehq/inputs@0/src/index.js'

const DefaultRuntime = new Runtime({ ...new Library(), Inputs })

// load note in module at url into el.querySelector(selector)
export async function loadNote(url, containerEl, selector) {
  const targetEl = containerEl.querySelector(selector)
  if (!targetEl) throw new Error(`selector not found: "${selector}"`)

  const noteExports = { ...await import(url), $el: targetEl }
  const noteBody = noteExports.$body || '<pre>no body</pre>'
  targetEl.innerHTML = noteBody

  const observerFactory = getObserverFactory(targetEl)
  const noteModule = new NoteModule(observerFactory)

  const vars = new Set(Object.keys(noteExports))
  for (const varName of vars) {
    const varValue = noteExports[varName]
    const [ type, name ] = getTypeNameFromName(varName)

    switch(type) {
      case 'Variable': noteModule.addVariable(name, varValue); break
      case 'View': noteModule.addViewOf(name, varValue); break
      case 'Mutable': noteModule.addMutable(name, varValue); break
      default: throw new Error(`unexpected export type ${type}`)
    }
  }

  return noteModule.module
}

class NoteModule {
  constructor (observerFactory) {
    this.module = DefaultRuntime.module()
    this.observerFactory = observerFactory
  }

  addVariable (name, value) {
    let params = []
    if (typeof value === 'function') {
      params = getFnParams(value)
    }

    const variable = this.module.variable(this.observerFactory(name))
    variable.define(name, params, value)
    return variable
  }

  addViewOf (name, fn) {
    const viewName = `${name}View`
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

  addMutable (name, initialValue) {
    const mutableName = `${name}Mutable`

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

function getTypeNameFromName(name) {
  let match

  match = name.match(/^(.*)View$/)
  if (match) return ['View', match[1]]

  match = name.match(/^(.*)MutableInit$/)
  if (match) return ['Mutable', match[1]]

  return ['Variable', name]
}

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

function getObserverFactory(containerEl) {
  return function observer(variableName) {
    if (variableName.startsWith('$')) return
    const el = containerEl.querySelector(`.${variableName}`)
    if (!el) return

    return new Inspector(el)
  }
}

