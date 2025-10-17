import { Logger } from '../utils/logger.js'
import { toSVGFillAttributes } from '../utils/svg.js'

export function donut (params) {
  // check arguments
  if (!params.slices) {
    Logger.error(`Invalid arguments: 'params.slices' must be defined`)
    return
  }
  const innerRadius = params.innerRadius || 10
  const outerRadius = params.innerRadius || 25
  const strokeWidth = params.stroke?.width || 1
  // compute additional parameters
  const center = outerRadius
  const sum = params.slices.reduce((sum, slice) => {
    const value = slice.value || 0
    return sum + value
  }, 0)
  if (sum === 0) {
    Logger.error(`Invalid arguments: 'params.slice' sum must be non null`)
    return
  }
  // render slices data
  let shape = '<g>'
  let currentAngle = -Math.PI / 2
  if (params.slices.length === 1) {
    const slice = params.slices[0]
    const pathData = `
      M ${center} ${center - outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 1 ${center} ${center + outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 1 ${center} ${center - outerRadius}
      M ${center} ${center - innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 0 ${center} ${center + innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 0 ${center} ${center - innerRadius}
    `
    const styleAttrs = toSVGFillAttributes(params)
    shape = `<path d="${pathData.trim()}" ${styleAttrs}><title>${slice.label}</title></path>`
  } else {
    for (const slice of params.slices) {
      const percentage = slice.value / sum
      const angle = percentage * Math.PI * 2
      if (angle > 0) {
        const startAngle = currentAngle
        const startCos = Math.cos(startAngle)
        const startSin = Math.sin(startAngle)
        const endAngle = currentAngle + angle
        const endCos = Math.cos(endAngle)
        const endSin = Math.sin(endAngle)
        const x1 = center + outerRadius * startCos
        const y1 = center + outerRadius * startSin
        const x2 = center + outerRadius * endCos
        const y2 = center + outerRadius * endSin
        const x3 = center + innerRadius * endCos
        const y3 = center + innerRadius * endSin
        const x4 = center + innerRadius * startCos
        const y4 = center + innerRadius * startSin
        const largeArc = angle > Math.PI ? 1 : 0
        const pathData = `
          M ${x1} ${y1}
          A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
          L ${x3} ${y3}
          A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
          Z
        `
        const styleAttrs = toSVGFillAttributes(slice)
        shape += `<path d="${pathData.trim()}" ${styleAttrs}><title>${slice.label}</title></path>`
        currentAngle += angle
      }
    }
    shape += '</g>'
  }
  // render center data
  const centerColor = params.center?.color
  if (centerColor && centerColor !== 'transparent') {
    shape += `<circle cx="${center}" cy="${center}" r="${innerRadius}" fill="${centerColor}" />`
  }
  /*const centerLabel = String(_.get(options, 'center.label'))
  if (!_.isEmpty(centerLabel)) {
    content += `<text x="${center}" y="${center}" style="font-size: 10px;" text-anchor="middle" alignment-baseline="central">${centerLabel}</text>`
  }*/
  return {
    width: center * 2,
    height: center * 2,
    viewBox: [0, 0, center * 2, center * 2],
    shape,
    transform: params.transform,
    icon: {
      class: params.icon?.class
    },
    text: {
      label: params.test?.label
    }
  }
}