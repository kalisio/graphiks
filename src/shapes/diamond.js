function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 2.4, height: params.radius * 2.4 }
  return { width: 50, height: 50 }
}

export function diamond (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<polygon points="50 0, 100 50, 50 100, 0 50" />',
    style: {
      fill: params.fill,
      fillOpacity: params.fillOpacity,
      stroke: params.stroke
    },
    transform: params.transform,
    icon: {
      class: params.icon?.class
    },
    text: {
      label: params.test?.label
    }
  }
}
