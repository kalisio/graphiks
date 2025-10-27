import { Logger } from './utils/logger.js'
import { circle } from './shapes/circle.js'
import { cross } from './shapes/cross.js'
import { diamond } from './shapes/diamond.js'
import { donut, pie } from './shapes/donut.js'
import { heart } from './shapes/heart.js'
import { markerPin, squarePin } from './shapes/pin.js'
import { pentagon, hexagon, polygon } from './shapes/polygon.js'
import { rect, roundedRect } from './shapes/rect.js'
import { star4, star5, star6 } from './shapes/star.js'
import { triangle, triangleDown, triangleRight, triangleLeft } from './shapes/triangle.js'

const SHAPES = {
  circle,
  cross,
  diamond,
  donut,
  pie,
  heart,
  pentagon,
  hexagon,
  polygon,
  rect,
  'rounded-rect': roundedRect,
  star4,
  star5,
  star6,
  triangle,
  'triangle-down': triangleDown,
  'triangle-right': triangleRight,
  'triangle-left': triangleLeft,
  'marker-pin': markerPin,
  'square-pin': squarePin
}

export const Registry = {
  register (type, generatorFn) {
    Logger.debug(`Registering ${type} shape`)
    SHAPES[type] = generatorFn
  },
  list () {
    return Object.keys(SHAPES)
  },
  has (type) {
    return Object.hasOwn(SHAPES, type)
  },
  get (type) {
    return SHAPES[type]
  }
}
