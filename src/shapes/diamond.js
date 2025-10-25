import { toSVGStyleAttributes } from '../utils/svg.js'

function getSize (params) {
  if (params.size) return { width: params.size[0], height: params.size[1] }
  if (params.radius) return { width: params.radius * 2.4, height: params.radius * 2.4 }
  return { width: 50, height: 50 }
}

export function diamond (params) {
  return {
    ...getSize(params),
    viewBox: [0, 0, 100, 100],
    shape: `<polygon points="50 0, 100 50, 50 100, 0 50" ${toSVGStyleAttributes(params)} />`,
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
    transform: params.transform
  }
}
