export const $layout = `
  <div class='header'></div>
  <div class='radius_view'></div>
  <div class='graphic'></div>
  <div class='trailer'></div>
`

export function header(md) {
  return md`Move the slider to change the radius of the circles.`
}

export function radius_view(Inputs) {
  return Inputs.range([1, 300], { value: 40, step: 1, label: 'radius' })
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
  const source = `[view current source](${import.meta.url})`
  return md`_${source}_`
}
