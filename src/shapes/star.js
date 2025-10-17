function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 2.8, height: params.radius * 2.8 }
  return { width: 50, height: 50 }
}

export function star4 (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M50 0 L65 40 L100 50 L65 60 L50 100 L35 60 L0 50 L35 40 Z" />',
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

export function star5 (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M50 0 L63 37 L100 37 L70 60 L83 97 L50 74 L17 97 L30 60 L0 37 L37 37 Z" />',
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

export function star6 (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<path d="M50 0 L58 40 L93 25 L65 50 L93 75 L58 60 L50 100 L42 60 L7 75 L35 50 L7 25 L42 40 Z" />',
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