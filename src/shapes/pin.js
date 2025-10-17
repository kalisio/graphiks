function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 2, height: params.radius * 2 }
  return { width: 50, height: 50 }
}

export function markerPin (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M50 98C50 98 2 70 2 36C2 18 23 2 50 2C77 2 98 18 98 36C98 70 50 98 50 98Z" />',
    style: {
      fill: params.fill,
      fillOpacity: params.fillOpacity,
      stroke: params.stroke
    },
    transform: params.transform,
    icon: {
      translation: ['-50%', '-70%'],
      class: params.icon?.class
    },
    text: {
      translation: ['-50%', '-70%'],
      label: params.test?.label
    },
    anchor: 'bottom-center'
  }
}

export function squarePin (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M4 16 Q 4 4 16 4 L 84 4 Q 96 4 96 16 L 96 64 Q 96 76 84 76 L 64 76 L 50 96 L 36 76 L 16 76 Q 4 76 4 64Z" />',
    style: {
      fill: params.fill,
      fillOpacity: params.fillOpacity,
      stroke: params.stroke
    },
    transform: params.transform,
    icon: {
      translation: ['-50%', '-75%'],
      class: params.icon?.class
    },
    text: {
      translation: ['-50%', '-60%'],
      label: params.test?.label
    },
    anchor: 'bottom-center'
  }
}

