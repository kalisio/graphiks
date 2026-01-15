import { Logger } from './utils/logger.js'
import { Cache } from './utils/cache.js'
import { toSVGStyleElement, toSVGTextElement, toSVGIconElement } from './utils/svg.js'

export function Shape (params) {
  // check argument
  if (!params) {
    Logger.error('Invalid argument: \'params\' must be defined')
  }
  if (!Number.isFinite(params.width) || params.width <= 0) {
    Logger.error('Invalid argument: \'params.width\' must be a positive number')
  }
  if (!Number.isFinite(params.height) || params.height <= 0) {
    Logger.error('Invalid argument: \'params.height\' must be a positive number')
  }
  if (!Number.isFinite(params.margin) || params.margin < 0) {
    Logger.error('Invalid argument: \'params.margin\' must be a non-negative number')
  }
  Logger.debug(`Shape created with ${JSON.stringify(params, null, 2)}`)

  // toSVG function
  function toSVG () {
    // check whether this shape is already in the cache
    if (params.key) {
      const svg = Cache.get(params.key)
      if (svg) {
        Logger.debug(`Shape '${params.key}' retrieved from cache`)
        return svg
      }
    }
    // otherwise setup the svg string
    const margin = params.margin
    let attributes = 'xmlns="http://www.w3.org/2000/svg"'
    attributes += ` width="${params.width}" height="${params.height}"`
    attributes += ` viewBox="${0 - margin} ${0 - margin} ${100 + 2 * margin} ${100 + 2 * margin}"`
    attributes += ' preserveAspectRatio="none"'
    attributes += ' overflow="visible"'
    const shapeElement = params.shape
    const styleElement = toSVGStyleElement(params)
    const textElement = toSVGTextElement(params)
    const iconElement = toSVGIconElement(params)
    const groupElement = `<g>${shapeElement}${textElement}${iconElement}</g>`
    const svg = `<svg ${attributes}>${styleElement}${groupElement}</svg>`
    if (params.key) {
      Cache.put(params.key, svg)
      Logger.debug(`Shape '${params.key}' cached`)
    }
    return svg
  }

  // toPNG function
  async function toPNG () {
    const svgBlob = new Blob([toSVG()], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    const img = await new Promise((resolve) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0)
    const png = canvas.toDataURL('image/png')
    URL.revokeObjectURL(url)
    return png
  }

  return {
    toSVG,
    toPNG
  }
}
