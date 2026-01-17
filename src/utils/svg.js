import { logger } from './logger.js'

export function toSVG (params, cache) {
  // check whether this shape is already in the cache
  if (params.key) {
    const svg = cache.get(params.key)
    if (svg) {
      logger.debug(`SVG '${params.key}' retrieved from cache`)
      return svg
    }
  }
  // otherwise setup the svg string
  const zoom = params.zoom || 1
  const width = params.width * zoom
  const height = params.height * zoom
  const margin = params.margin
  let attributes = 'xmlns="http://www.w3.org/2000/svg"'
  attributes += ` width="${width}" height="${height}"`
  attributes += ` viewBox="${0 - margin} ${0 - margin} ${100 + margin * 2} ${100 + margin * 2}"`
  attributes += ' preserveAspectRatio="none"'
  attributes += ' overflow="visible"'
  const shapeElement = params.shape
  const styleElement = toSVGStyleElement(params)
  const textElement = toSVGTextElement(params)
  const iconElement = toSVGIconElement(params)
  const groupElement = `<g>${shapeElement}${textElement}${iconElement}</g>`
  const svg = `<svg ${attributes}>${styleElement}${groupElement}</svg>`
  if (params.key) {
    cache.set(params.key, svg)
    logger.debug(`SVG '${params.key}' cached`)
  }
  return svg
}

export function toSVGStyleElement (params) {
  const { style } = params
  if (!style) return ''
  return `<style>${params.style}</style>`
}

export function toSVGTextElement (params) {
  const { text, height } = params
  if (!text?.label) return ''
  const fontScale = 100 / height
  const size = (text.size ?? 12) * fontScale
  let attrs = `text-anchor="middle" alignment-baseline="central" font-size="${size}px"`
  if (text.color) attrs += ` fill: "${text.color}"`
  if (text.font) attrs += ` font-family: "${text.font}"`
  if (text.style) attrs += ` font-style: "${text.style}"`
  if (text.weight) attrs += ` font-weight: "${text.weight}"`
  if (text.variant) attrs += ` font-variant: "${text.variant}"`
  if (text.transform) attrs += ` ${toSVGTransformAttribute(text.transform)}`
  return `<text ${attrs}>${text.label}</text>`
}

export function toSVGIconElement (params) {
  const { icon, height } = params
  if (!icon || (!icon.classes && !icon.url)) return ''
  const fontScale = 100 / height
  const size = (icon.size ?? 12) * fontScale
  let iconStyle = `font-size: ${size}px;`
  if (icon.color) iconStyle += `color=${icon.color};`
  const iconElement = `<i style="${iconStyle}" class="${icon.classes}"</i>`
  const divStyle = 'display:flex;align-items:center;justify-content:center;height:100%;width:100%;'
  const divElement = `<div xmlns="http://www.w3.org/1999/xhtml" style="${divStyle}">${iconElement}</div>`
  return `<foreignObject width="100" height="100">${divElement}</foreignObject>`
}

export function toSVGTitleElement (params) {
  const { label } = params
  if (!label) return ''
  return `<title>${label}</title>`
}

export function toSVGStyleAttributes (params) {
  if (!params) return ''
  let attrs = ''
  if (params.color) attrs += `fill="${params.color}" `
  if (params.opacity) attrs += `fill-opacity="${params.opacity}" `
  if (params.stroke) {
    const stroke = params.stroke
    if (stroke.color === 'transparent') return ''
    attrs += 'vector-effect="non-scaling-stroke" '
    attrs += `stroke-width="${stroke.width || '1px'}" `
    attrs += `stroke="${stroke.color || 'black'}" `
    if (stroke.opacity) attrs += `stroke-opacity="${stroke.opacity}" `
    if (stroke.dashArray) attrs += `stroke-dasharray="${stroke.dashArray}" `
    if (stroke.dashOffset) attrs += `stroke-dashoffset="${stroke.dashOffset}" `
    if (stroke.lineCap) attrs += `stroke-linecap="${stroke.lineCap}" `
    if (stroke.lineJoin) attrs += `stroke-linejoin="${stroke.lineJoin}" `
    if (stroke.miterLimit) attrs += `stroke-miterlimit="${stroke.miterLimit}"`
  }
  return attrs.trim()
}

export function toSVGTransformAttribute (transform) {
  if (!transform) return ''
  let attr = 'transform="'
  if (transform.rotate) attr += `rotate(${transform.rotate.join(' ')})`
  if (transform.translate) attr += ` translate(${transform.translate.join(' ')})`
  if (transform.scale) attr += ` scale(${transform.scale.join(' ')})`
  if (transform.skewX) attr += ` skewX(${transform.skewX})`
  if (transform.skewY) attr += ` skewY(${transform.skewY})`
  attr += '"'
  return attr.trim()
}
