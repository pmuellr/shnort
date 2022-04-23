export const $layout = `
  <div class='header'></div>
  <div class='paused_view'></div>
  <div class='counter'></div>
  <div class='trailer'></div>
`

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
    console.log('generator is updating counter')
    yield ++counter
  }
}

export function trailer(md) {
  const source = `[view current source](${import.meta.url})`
  return md`_${source}_`
}
