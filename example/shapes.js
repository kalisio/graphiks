import { Graphiks } from '../src/graphiks.js'

const shapes = [
  {
    shape: 'circle',
    fill: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'cross',
    fill: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'heart',
    fill: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'rect',
    fill: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'rounded-rect',
    fill: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'diamond',
    fill: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-up',
    fill: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-down',
    fill: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-right',
    fill: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-left',
    fill: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'marker-pin',
    fill: 'purple',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'square-pin',
    fill: 'purple',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star4',
    fill: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star5',
    fill: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star6',
    fill: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'pentagon',
    fill: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'hexagon',
    fill: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'polygon',
    fill: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'donut',
    slices: [{
      value: 10,
      label: 'a',
      fill: 'red',
      opacity: 0.75
    }, {
      value: 25,
      label: 'b',
      fill: 'green',
      opacity: 0.75
    }, {
      value: 18,
      label: 'c',
      fill: 'blue',
      opacity: 0.75
    }],
    fill: 'magenta',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  }
]

for (const shapeParams of shapes) {
  const shapeObj = Graphiks.renderShape({ ...shapeParams, text: { label: shapeParams.shape } })
  const container = document.getElementById(shapeParams.shape)
  container.innerHTML = shapeObj.toSVG()
}
