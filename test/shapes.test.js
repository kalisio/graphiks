import * as chai from 'chai'
import fs from 'fs'
import { graphiks } from '../src/graphiks.js'

const { expect } = chai

const MODE = process.env.TEST_MODE || 'run'

describe('shapes', () => {
  let Graphiks
  const BasicShapes = [
    { shape: 'circle', color: 'red' },
    { shape: 'cross', color: 'red' },
    { shape: 'heart', color: 'red' },
    { shape: 'rect', color: 'green' },
    { shape: 'rounded-rect', color: 'green' },
    { shape: 'diamond', color: 'green' },
    { shape: 'triangle', color: 'blue' },
    { shape: 'triangle-down', color: 'blue' },
    { shape: 'triangle-right', color: 'blue' },
    { shape: 'triangle-left', color: 'blue' },
    { shape: 'marker-pin', color: 'purple' },
    { shape: 'square-pin', color: 'purple' },
    { shape: 'star4', color: 'lime' },
    { shape: 'star5', color: 'lime' },
    { shape: 'star6', color: 'lime' },
    { shape: 'pentagon', color: 'yellow' },
    { shape: 'hexagon', color: 'yellow' },
    { shape: 'polygon', color: 'yellow' },
    {
      shape: 'donut',
      slices: [
        { value: 10, label: 'slice a', color: 'red' },
        { value: 25, label: 'slice b', color: 'green' },
        { value: 18, label: 'slice c', color: 'blue' }
      ]
    },
    {
      shape: 'pie',
      slices: [
        { value: 12, label: 'slice a', color: 'red' },
        { value: 30, label: 'slice b', color: 'green' },
        { value: 10, label: 'slice c', color: 'blue' }
      ]
    }
  ]

  before(() => {
    Graphiks = graphiks()
  })

  it('should list the shapes', () => {
    const shapes = Graphiks.listShapes()
    expect(shapes).to.be.a('array')
  })

  it('should have the circle shape registered', () => {
    const hasCircle = Graphiks.hasShape('circle')
    expect(hasCircle).to.equal(true)
  })

  it('should not have the dummy shape registered', () => {
    const hasDummy = Graphiks.hasShape('dummy')
    expect(hasDummy).to.equal(false)
  })

  it('should render the registered registered correctly', () => {
    for (const shape of BasicShapes) {
      const graphic = Graphiks.renderShape(shape)
      expect(graphic).to.not.equal(null)
      if (MODE === 'run') {
        const svg = fs.readFileSync(`test/data/${shape.shape}.svg`, 'utf8')
        expect(graphic.toSVG()).to.equal(svg)
      } else {
        fs.writeFileSync(`test/data/${shape.shape}.svg`, 'graphic.toSVG()')
      }
    }
  })
})
