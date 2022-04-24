// @ts-ignore
const vegaEmbed = window.vegaEmbed

export const $layout_md = `
from [Vega-Lite – A Grammar of Interactive Graphics](https://vega.github.io/vega-lite/)

<div class='chartSeattleWeather'></div>

------------------------------------------------------------------------
**vega lite spec**

<div class='vegaLiteSpec'></div>

------------------------------------------------------------------------
**all data available**

<div class='data'></div>

------------------------------------------------------------------------
**seattle-weather.csv as an object** 

<div class='seattleWeather'></b></div>

------------------------------------------------------------------------
**first few rows of seattle-weather.csv as a table**

<div class='tableSeattleWeather'></div>
  
------------------------------------------------------------------------
_[view current source](${import.meta.url})_
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

