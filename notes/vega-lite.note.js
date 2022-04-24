// @ts-ignore
const vegaEmbed = window.vegaEmbed


export const $layout = `
  <div class='header'></div>
  <div class='chartSeattleWeather boxed'></div>
  <div class='boxed'>
    <b>vega lite spec</b><hr>
    <div class='vegaLiteSpec'></div>
  </div>
  <div class='boxed'>
    <b>all data available</b><hr>
    <div class='data'></div>
  </div>
  <div class='boxed'>
    <b>seattle-weather.csv as an object<hr>
    <div class='seattleWeather'></b></div>
  </div>
  <div class='boxed'>
    <b>first few rows of seattle-weather.csv as a table</b><hr>
    <div class='tableSeattleWeather'></div>
  </div>
  <div class='trailer'></div>
`

export function header(md) {
  return md`from [Vega-Lite – A Grammar of Interactive Graphics](https://vega.github.io/vega-lite/)`
}

export const data = async (require) => await require('vega-datasets@1')
export const seattleWeather = (data) => data['seattle-weather.csv']() 

export function tableSeattleWeather(Inputs, seattleWeather) {
  return Inputs.table(seattleWeather.slice(0, 5))
}

export function chartSeattleWeather(vegaLiteSpec) {
  return vegaEmbed.container(vegaLiteSpec)
}

export function vegaLiteSpec(seattleWeather) {
  return {
    title: 'precipitation in Seattle',
    data: { values: seattleWeather },
    mark: 'bar',
    encoding: {
      x: { timeUnit: 'month', field: 'date', type: 'ordinal' },
      y: { aggregate: 'mean', field: 'precipitation'},
    }
  }
}

export function trailer(md) {
  const source = `[view current source](${import.meta.url})`
  return md`_${source}_`
}

