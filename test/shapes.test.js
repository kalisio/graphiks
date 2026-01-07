import * as chai from 'chai'
import { graphiks } from '../src/graphiks.js'

const { expect } = chai

describe('shapes', () => {
  let Graphiks

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
})
