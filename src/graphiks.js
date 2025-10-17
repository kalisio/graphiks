import { Logger } from './utils/logger.js'
import { Shape } from './shape.js'
import { Registry } from './registry.js'

export const Graphiks = {
  listShapes () {
    return Registry.list()
  },
  hasShape (type) {
    return Registry.has(type)
  },
  registerShape (type, generatorFn) {
    Registry.register(type, generatorFn)
  },
  renderShape (params) {
    // check arguments
    if (!params.shape) {
      Logger.error(`Invalid argument: 'params.shape' must be defined`)
    }
    // generate the shape
    const generatorFn = Registry.get(params.shape)
    if (!generatorFn) {
      Logger.error(`Invalid shape: '${params.shape}' is unknown`)
    }
    return Shape(generatorFn(params))
  }
}
