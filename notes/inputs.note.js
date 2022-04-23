export const $layout = `
  <div class='header'></div>
  <div class=boxed><div class=button_view>  </div><div class=button>  </div></div>
  <div class=boxed><div class=toggle_view>  </div><div class=toggle>  </div></div>
  <div class=boxed><div class=checkbox_view></div><div class=checkbox></div></div>
  <div class=boxed><div class=radio_view>   </div><div class=radio>   </div></div>
  <div class=boxed><div class=range_view>   </div><div class=range>   </div></div>
  <div class=boxed><div class=select_view>  </div><div class=select>  </div></div>
  <div class=boxed><div class=text_view>    </div><div class=text>    </div></div>
  <div class=boxed><div class=textarea_view></div><div class=textarea></div></div>
  <div class=boxed><div class=date_view>    </div><div class=date>    </div></div>
  <div class=boxed><div class=color_view>   </div><div class=color>   </div></div>
  <div class=boxed><div class=file_view>    </div><div class=file>    </div></div>
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

export function trailer(md) {
  const source = `[view current source](${import.meta.url})`
  return md`_${source}_`
}
