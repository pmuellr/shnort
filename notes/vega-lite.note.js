// @ts-ignore
const vegaEmbed = window.vegaEmbed

export const data = async (require) => await require('vega-datasets@1')
export const seattleWeather = (data) => data['seattle-weather.csv']() 

export function topic_view(Inputs) {
  return Inputs.radio(
    ['precipitation', 'temp_max', 'temp_min'], 
    { value: 'precipitation', label: "Topic" }
  )
}

export function chartSeattleWeather(vegaLiteSpec) {
  return vegaEmbed.container(vegaLiteSpec)
}

export function vegaLiteSpec(seattleWeather, topic) {
  return {
    title: `${topic} in Seattle`,
    data: { values: seattleWeather },
    mark: 'bar',
    encoding: {
      x: { timeUnit: 'month', field: 'date', type: 'ordinal' },
      y: { aggregate: 'mean', field: topic },
    }
  }
}

export function tableSeattleWeather(Inputs, seattleWeather) {
  return Inputs.table(seattleWeather.slice(0, 5))
}

export const $layout_md = `
from [Vega-Lite – A Grammar of Interactive Graphics](https://vega.github.io/vega-lite/)

<div class='topic_view'></div>
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
