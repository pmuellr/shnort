const thisUrl = import.meta.url
const ghUrl = 'https://github.com/pmuellr/shnort/blob/master/notes/graphic.note.js'

export const $cells = [
  'header',
  'radius_view',
  'graphic',
  'trailer',
]

export function header(md) {
  return md`Move the slider to change the radius of the circles.`
}

export function radius_view(Inputs) {
  // return html`<input type=range min=1 max=300 step=1 value=40>`
  return Inputs.range([1, 300], { value: 40, label: 'radius' })
}

export function graphic(html, radius) {
  return html`
    <svg width=400 height=400>
      <circle cx=190 cy=190 r=${radius} fill=green style="opacity: 0.25;" /> 
      <circle cx=200 cy=200 r=${radius} fill=red   style="opacity: 0.25;" />  
      <circle cx=210 cy=210 r=${radius} fill=blue  style="opacity: 0.25;" /> 
    </svg>
  `
}

export function trailer(md) {
  const currSource = `[view current source](${thisUrl})`
  const githSource = `[view source at Gihub](${ghUrl})`
  return md`_${currSource}_<br>_${githSource}_`
}
