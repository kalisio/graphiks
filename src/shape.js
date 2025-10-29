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

  shape.toPNG = async () => {
    const svgBlob = new Blob([shape.toSVG()], { type: "image/svg+xml" })
    const url = URL.createObjectURL(svgBlob)
    const img = await new Promise((resolve) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.src = url
    })
    const canvas = document.createElement("canvas")
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0)
    const png = canvas.toDataURL("image/png")
    URL.revokeObjectURL(url)
    return png
  }
  
  return shape
}
