function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 1.8, height: params.radius * 1.8 }
  return { width: 50, height: 50 }
}

export function circle (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<circle cx="50" cy="50" r="50" />',
    style: {
      fill: params.fill,
      fillOpacity: params.fillOpacity,
      stroke: params.stroke
    },
    icon: {
      class: params.icon?.class
    },
    text: {
      label: params.test?.label
    }
  }
}