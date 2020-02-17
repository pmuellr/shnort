//@ts-ignore
const thisUrl = import.meta.url
const ghUrl = 'https://github.com/pmuellr/shnort/blob/master/notes/graphic.note.js'

// The $body export defines the HTML structure of the note.
// The references in the class properties of the div's and span's are
// to variables, exported as functions below.
export const $body = `
  <p>Move the slider to change the radius of the circles.</p>

  <div>
    <span class=radiusView></span>
    <span class=radius></span>
  </div>

  <div class=graphic></div>

  <p><i><a href="${thisUrl}">view current source</a></i></p>
  <p><i><a href="${ghUrl}">view source at GitHub</a></i></p>
`

// Defines the `radius` and `randiusView` variables.
// `radiusView` is the HTML element with the slider.
// `radius` is the current value of the slider.
export function radiusView(html) {
  return html`<input type=range min=1 max=300 step=1 value=40>`
}

// Defines the `graphic` variable, which is an SVG element.
// When the `radius` variable changes because the slider is changed, this
// function is invoked to return the new SVG element.
export function graphic(html, radius) {
  return html`
    <svg width=400 height=400>
      <circle cx=190 cy=190 r=${radius} fill=green style="opacity: 0.25;" /> 
      <circle cx=200 cy=200 r=${radius} fill=red   style="opacity: 0.25;" />  
      <circle cx=210 cy=210 r=${radius} fill=blue  style="opacity: 0.25;" /> 
    </svg>
  `
}
