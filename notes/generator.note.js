export const $body = `
  <p>Clone of the
    <a href="https://observablehq.com/@mbostock/pause-a-generator">Pause a Generator</a>
    Observable Notebook.
  </p>
  <div>
    <label>
      <span class=pausedView></span>
      <label for=paused>paused</label>
    </label>
  </div>
  <div class=counter></div>
`
  
export function pausedView(html) {
  return html`<input id=paused type=checkbox>`
}

export function *counter(paused) {
  let counter = this | 0
  if (paused) return yield counter

  while (true) {
    yield ++counter
  }
}
