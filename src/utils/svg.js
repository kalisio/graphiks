import { Logger } from './logger.js'

export function toSVGElement (params) {
  if (!params.width) {
    Logger.error('Invalid argument: \'params.width\' must be defined')
  }
  if (!params.height) {
    Logger.error('Invalid argument: \'params.height\' must be defined')
  }
  if (!params.shape) {
    Logger.error('Invalid argument: \'params.shape\' must be defined')
  }
  const shapeElement = params.shape
  const styleElement = toSVGStyleElement(params.style)
  const scaleFontRatio = 100 / params.height
  const textElement = toSVGTextElement(params.text, scaleFontRatio)
  const iconElement = toSVGIconElement(params.icon, scaleFontRatio)
  const groupElement = `<g>${shapeElement}${textElement}${iconElement}</g>`
  return `<svg ${toSVGAttributes(params)}>${styleElement}${groupElement}</svg>`
}

export function toSVGStyleElement (style) {
  if (!style) return ''
  return `<style>${style}</style>`
}

export function toSVGTextElement (text, scaleFontRatio) {
  if (!text || !text.label) return ''
  let attrs = 'text-anchor="middle" alignment-baseline="central" '
  let size = (text.size ?? 14) * scaleFontRatio
  attrs += `font-size="${size}px"`
  if (text.color) attrs += ` fill: "${text.color}"`
  if (text.font) attrs += ` font-family: "${text.font}"`
  if (text.style) attrs += ` font-style: "${text.style}"`
  if (text.weight) attrs += ` font-weight: "${text.weight}"`
  if (text.variant) attrs += ` font-variant: "${text.variant}"`
  if (text.transform) attrs += ` ${toSVGTransformAttribute(text.transform)}`
  return `<text ${attrs}>${text.label}</text>`
}

export function toSVGIconElement (icon, scaleFontRatio) {
  if (!icon || (!icon.classes && !icon.url)) return ''
  let fontSize = (icon.size ?? 24) * scaleFontRatio
  let style = "font-size: ${fontSize}px;"
  if (icon.color) style += ' '
  let iconElement = `<i style="font-size: ${fontSize}px; color: ${icon.color}" class="${icon.classes}"</i>`
  let divElement = `<div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;">${iconElement}</div>`
  return `<foreignObject width="100" height="100">${divElement}</foreignObject>`
}

export function toSVGAttributes (params) {
  if (!params) return ''
  const margin = params.stroke ? params.stroke.width ?? 1 : 0
  let attrs = 'xmlns="http://www.w3.org/2000/svg"'
  attrs += ` width="${params.width}" height="${params.height}"`
  attrs += ` viewBox="${0 - margin / 2} ${0 - margin / 2} ${100 + margin} ${100 + margin}"`
  attrs += ' preserveAspectRatio="none"'
  attrs += ' overflow="visible"'
  return attrs
}

export function toSVGStyleAttributes (params) {
  if (!params) return ''
  let attrs = ''
  if (params.color) attrs += `fill="${params.color}" `
  if (params.opacity) attrs += `fill-opacity="${params.opacity}" `
  if (params.stroke) attrs += toSVGStrokeAttributes(params.stroke)
  return attrs.trim()
}

export function toSVGStrokeAttributes (stroke) {
  if (stroke.color === 'transparent') return ''
  let attrs = 'vector-effect="non-scaling-stroke" '
  attrs += `stroke-width="${stroke.width || '1px'}" `
  attrs += `stroke="${stroke.color || 'black'}" `
  if (stroke.opacity) attrs += `stroke-opacity="${stroke.opacity}" `
  if (stroke.dashArray) attrs += `stroke-dasharray="${stroke.dashArray}" `
  if (stroke.dashOffset) attrs += `stroke-dashoffset="${stroke.dashOffset}" `
  if (stroke.lineCap) attrs += `stroke-linecap="${stroke.lineCap}" `
  if (stroke.lineJoin) attrs += `stroke-linejoin="${stroke.lineJoin}" `
  if (stroke.miterLimit) attrs += `stroke-miterlimit="${stroke.miterLimit}"`
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

