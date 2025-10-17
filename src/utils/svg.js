import { Logger } from './logger.js'

export function toSVGElement (params) {
  if (!params.width) {
    Logger.error(`Invalid argument: 'params.width' must be defined`)
  }
  if (!params.height) {
    Logger.error(`Invalid argument: 'params.height' must be defined`)
  }
  if (!params.shape) {
    Logger.error(`Invalid argument: 'params.shape' must be defined`)
  }
  let attrs = toSVGAttributes(params)
  let styleAttrs = toSVGStyleAttributes(params.style)
  let transformAttr = toSVGTransformAttribute(params.transform)
  let shape = `${params.shape.slice(0, -2)} ${styleAttrs} ${transformAttr} />`
  return `<svg ${attrs}>${shape}</svg>`
}

export function toSVGAttributes (params) {
  if (!params) return ''
  const margin = params.stroke ? params.stroke.width || 1 : 0
  let attrs = 'xmlns="http://www.w3.org/2000/svg"'
  attrs += ` width="${params.width}" height="${params.height}"`
  attrs += ` viewBox="${params.viewBox[0] - margin / 2} ${params.viewBox[1] - margin / 2} ${params.viewBox[2] + margin} ${params.viewBox[3] + margin}"`
  attrs += ' preserveAspectRatio="none"'
  attrs += ' overflow="visible"'
  return attrs.trim()
}

export function toSVGStyleAttributes (params) {
  if (!params) return ''
  let attrs = `${toSVGFillAttributes(params)} `
  if (params.stroke) attrs += toSVGStrokeAttributes(params.stroke)
  return attrs.trim()
}

export function toSVGFillAttributes (params) {
  let attrs = ''
  if (params.fill) attrs += `fill="${params.fill}" `
  if (params.opacity) attrs += `fill-opacity="${params.opacity}" `
  return attrs.trim()
}

export function toSVGStrokeAttributes (stroke) {
  if (!stroke.color || stroke.color === 'transparent') return ''
  let attrs = `stroke="${stroke.color}" `
  attrs += `vector-effect="non-scaling-stroke" `
  if (stroke.opacity) attrs += `stroke-opacity="${stroke.opacity}" `
  if (stroke.width) attrs += `stroke-width="${stroke.width}" `
  if (stroke.dashArray) attrs += `stroke-dasharray="${stroke.dashArray}" `
  if (stroke.dashOffset) attrs += `stroke-dashoffset="${stroke.dashOffset}" `
  if (stroke.lineCap) attrs += `stroke-linecap="${stroke.lineCap}" `
  if (stroke.lineJoin) attrs += `stroke-linejoin="${stroke.lineJoin}" `
  if (stroke.lineJoin) attrs += `stroke-linejoin="${stroke.lineJoin}" `
  if (stroke.miterLimit) attrs += `stroke-miterlimit="${stroke.miterLimit}"`
  return attrs.trim()
}

export function toSVGTransformAttribute (transform) {
  if (!transform) return ''
  let attr = `transform="`
  if (transform.rotate) attr += `rotate(${transform.rotate.join(' ')}) `
  if (transform.translate) attr += `translate(${transform.translate.join(' ')}) `
  if (transform.scale) attr += `scale(${transform.scale.join(' ')}) `
  if (transform.skewX) attr += `skewX(${transform.skewX}) `
  if (transform.skewY) attr += `skewY(${transform.skewY})`
  attr += '"'
  return attr.trim()
}