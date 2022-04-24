const inputs = [
  'button',
  'toggle',
  'checkbox',
  'radio',
  'range',
  'select',
  'text',
  'textarea',
  'date',
  'color',
  'file',
  'form',
]

const divs = inputs.map(input => `
  <div class=boxed> 
    <b>${input}</b><hr>
    <div class=${input}_view></div>
    <div class=${input}></div>
  </div>`
)
export const $layout = `
  <div class='header'></div>
  ${divs}
  <div class=boxed> <b>bind</b>     <div class=bound1_view>    </div><div class=bound2_view>  </div></div>
  <div class='trailer'></div>
`

export function header(md) {
  return md`Examples using [Inputs](https://observablehq.com/@observablehq/inputs).`
}

export function button_view(Inputs) {
  return Inputs.button("Click me")
}

export function toggle_view(Inputs) {
  return Inputs.toggle({label: "Mute"})
}

export function checkbox_view(Inputs) {
  return Inputs.checkbox(["salty", "sweet", "bitter", "sour", "umami"], {label: "Flavors"})
}

export function radio_view(Inputs) {
  return Inputs.radio(["salty", "sweet", "bitter", "sour", "umami"], {label: "Flavor"})
}

export function range_view(Inputs) {
  return Inputs.range([1, 11], { value: 5, step: 0.1, label: 'gain' })
}

export function select_view(Inputs) {
  const stateNames = ['TX', 'CA', 'SC', 'KY', 'IN', 'MD', 'NC']
  return Inputs.select([null].concat(stateNames), {label: "Home state"})
}

export function text_view(Inputs) {
  return Inputs.text({label: "Name", placeholder: "What’s your name?"})
}

export function textarea_view(Inputs) {
  return Inputs.textarea({label: "Biography", placeholder: "What’s your story?"})
}

export function date_view(Inputs) {
  return Inputs.date({label: "Birthday"})
}

export function color_view(Inputs) {
  return Inputs.color({label: "Favorite color", value: "#4682b4"})
}

export function file_view(Inputs) {
  return Inputs.file({label: "CSV file", accept: ".csv", required: true})
}

export function form_view(Inputs) {
  return Inputs.form({
    r: Inputs.range([0, 255], {step: 1, label: "r"}),
    g: Inputs.range([0, 255], {step: 1, label: "g"}),
    b: Inputs.range([0, 255], {step: 1, label: "b"})
  })
}

export function bound1_view(Inputs) {
  const input = Inputs.range([0, 100], { value: 50, step: 1, label: 'range' })
  return input
}

export function bound2_view(Inputs, bound1_view) {
  const input =  Inputs.number([0, 100], { value: 50, step: 1, label: 'number' })
  return Inputs.bind(input, bound1_view)
}

export function trailer(md) {
  const source = `[view current source](${import.meta.url})`
  return md`_${source}_`
}
