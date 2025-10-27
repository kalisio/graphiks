import { graphiks } from '../src/graphiks.js'

const shapes = [
  {
    shape: 'circle',
    color: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 },
    style: 'circle { color: gold; stroke: maroon; stroke-width: 2px; }'
  },
  {
    shape: 'cross',
    color: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'heart',
    color: 'red',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'rect',
    color: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'rounded-rect',
    color: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'diamond',
    color: 'green',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle',
    color: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-down',
    color: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-right',
    color: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'triangle-left',
    color: 'blue',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'marker-pin',
    color: 'purple',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'square-pin',
    color: 'purple',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star4',
    color: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star5',
    color: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'star6',
    color: 'lime',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'pentagon',
    color: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'hexagon',
    color: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'polygon',
    color: 'yellow',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'donut',
    slices: [{
      value: 10,
      label: 'a',
      color: 'red',
      opacity: 0.75
    }, {
      value: 25,
      label: 'b',
      color: 'green',
      opacity: 0.75
    }, {
      value: 18,
      label: 'c',
      color: 'blue',
      opacity: 0.75
    }],
    color: 'magenta',
    opacity: 0.5,
    stroke: { color: 'orange', width: 3 }
  },
  {
    shape: 'pie',
    slices: [{
      value: 10,
      label: 'a',
      color: 'red',
      opacity: 0.75
    }, {
      value: 25,
      label: 'b',
      color: 'green',
      opacity: 0.75
    }, {
      value: 18,
      label: 'c',
      color: 'blue',
      opacity: 0.75
    }],
    color: 'magenta',
    opacity: 0.5,
    stroke: { color: 'orange', width: 1 }
  }
]
const Graphiks = graphiks({ loglevel: 'debug' })
for (const shapeParams of shapes) {
  const shapeObj = Graphiks.renderShape({
    ...shapeParams,
    text: {
      label: shapeParams.shape,
      size: '2em',
      transform: { translate: [50, 140] }
    }
  })
  const container = document.getElementById(shapeParams.shape)
  container.innerHTML = shapeObj.toSVG()
}
