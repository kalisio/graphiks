import { toSVGElement } from './utils/svg.js'
import { Cache } from './utils/cache.js'

export function Shape (params) {
  const shape = params

  shape.toSVG = () => {
    if (shape.key) {
      const svg = Cache.get(shape.key)
      return svg
    }
    const svg = toSVGElement(shape)
    if (svg && shape.key) {
      Cache.put(shape.key, svg)
    }
    return svg
  }

  return shape
}
