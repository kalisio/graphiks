function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 1.8, height: params.radius * 1.8 }
  return { width: 50, height: 50 }
}

export function rect (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<rect x="0" y="0" width="100" height="100" />',
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

export function roundedRect (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<rect cx="0" cy="0" width="100" height="100" rx="20" ry="20" />',
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