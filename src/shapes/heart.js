function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 2, height: params.radius * 2 }
  return { width: 50, height: 50 }
}

export function heart (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M50 100 C50 100 0 65 0 35 C0 15 10 0 25 0 C37 0 50 10 50 10 C50 10 63 0 75 0 C90 0 100 15 100 35 C100 65 50 100 50 100 Z" />',
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