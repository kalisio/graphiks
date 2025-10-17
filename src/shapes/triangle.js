import { Logger } from "../utils/logger.js"

function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 1.8, height: params.radius * 1.8 }
  return { width: 50, height: 50 }
}


export function triangle (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: '<polygon points="50 0, 100 100, 0 100" />',
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

export function triangleUp (params) {
  return triangle({
    ...params
  })
}

export function triangleDown (params) {
  return triangleUp({
    ...params,
    transform: {
      rotate: [180, 50, 50]
    }
  })
}

export function triangleRight (params) {
  return triangleUp({
    ...params,
    transform: {
      rotate: [90, 50, 50]
    }
  })
}

export function triangleLeft (params) {
  return triangleUp({
    ...params,
    transform: {
      rotate: [270, 50, 50]
    }
  })
}