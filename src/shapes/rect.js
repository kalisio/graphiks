import { toSVGStyleAttributes, toSVGTransformAttribute } from '../utils/svg.js'

function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 1.8, height: params.radius * 1.8 }
  return { width: 50, height: 50 }
}

export function rect (params) {
  return {
    ...getSize(params),
    shape:
      `<rect x="0" y="0" width="100" height="100"
        ${toSVGStyleAttributes(params)}
        ${toSVGTransformAttribute(params.transform)}
      />`,
    icon: {
      transform: {
        translate: [50, 50]
      },
      ...params.icon
    },
    text: {
      transform: {
        translate: [50, 50]
      },
      ...params.text
    },
    style: params.style
  }
}

export function roundedRect (params) {
  return {
    ...getSize(params),
    shape:
      `<rect cx="0" cy="0" width="100" height="100" rx="20" ry="20"
        ${toSVGStyleAttributes(params)}
        ${toSVGTransformAttribute(params.transform)}
      />`,
    icon: {
      transform: {
        translate: [50, 50]
      },
      ...params.icon
    },
    text: {
      transform: {
        translate: [50, 50]
      },
      ...params.text
    },
    style: params.style
  }
}
