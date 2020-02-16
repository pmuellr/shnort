export const $title = 'graphic'

export const $body = `
  <p>Move the slider to change the radius of the circles.</p>

  <div>
    <span class=radiusView></span>
    <span class=radius></span>
  </div>

  <div class=graphic></div>
`

export function radiusView(html) {
  return html`<input type=range min=1 max=300 step=1 value=40>`
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
