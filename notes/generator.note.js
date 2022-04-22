const thisUrl = import.meta.url
const ghUrl = 'https://github.com/pmuellr/shnort/blob/master/notes/generator.note.js'

export const $cells = [
  'header',
  'paused_view',
  'counter',
  'trailer',
]

export function header(md) {
  return md`
  Clone of the
  [Pause a Generator](https://observablehq.com/@mbostock/pause-a-generator)
  Observable Notebook.
  `
}
  
export function paused_view(Inputs) {
  return Inputs.toggle({ label: 'Paused' })
}

export function *counter(paused) {
  let counter = this | 0
  if (paused) return yield counter

  while (true) {
    yield ++counter
  }
}

export function trailer(md) {
  const currSource = `[view current source](${thisUrl})`
  const githSource = `[view source at Gihub](${ghUrl})`
  return md`_${currSource}_<br>_${githSource}_`
}
