import { describe, it, expect, beforeEach, vi } from 'vitest'
import { logger } from '../src/utils/logger'
import { Cache } from '../src/utils/cache'
import * as svg from '../src/utils/svg'
import { toPNG } from '../src/utils/png'

// Mock DOM APIs
global.Blob = class Blob {
  constructor (content, options) {
    this.content = content
    this.options = options
  }
}
global.URL = {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
  revokeObjectURL: vi.fn()
}
global.Image = class {
  constructor () {
    setTimeout(() => {
      this.width = 100
      this.height = 100
      if (this.onload) this.onload()
    }, 0)
  }
}
global.document = {
  createElement: vi.fn(() => ({
    width: 0,
    height: 0,
    getContext: vi.fn(() => ({
      imageSmoothingEnabled: false,
      imageSmoothingQuality: '',
      drawImage: vi.fn()
    })),
    toDataURL: vi.fn(() => 'data:image/png;base64,mock-png-data')
  }))
}

describe('toPNG', () => {
  let cache
  let mockParams

  beforeEach(() => {
    cache = new Cache()
    mockParams = {
      width: 100,
      height: 100,
      margin: 10,
      shape: '<circle cx="50" cy="50" r="40"/>'
    }
    vi.spyOn(logger, 'debug').mockImplementation(() => {})
    vi.spyOn(svg, 'toSVG').mockReturnValue('<svg>mock</svg>')
    vi.clearAllMocks()
  })

  it('should generate PNG', async () => {
    const png = await toPNG(mockParams, cache)
    expect(png).toBe('data:image/png;base64,mock-png-data')
  })

  it('should cache PNG when key is provided', async () => {
    mockParams.key = 'circle-png'
    const png = await toPNG(mockParams, cache)
    expect(png).toBe('data:image/png;base64,mock-png-data')
    expect(cache.has('circle-png')).toBe(true)
    expect(logger.debug).toHaveBeenCalledWith("PNG 'circle-png' cached")
  })

  it('should retrieve from cache when key exists', async () => {
    mockParams.key = 'circle-png'
    const firstPng = await toPNG(mockParams, cache)
    const secondPng = await toPNG(mockParams, cache)
    expect(firstPng).toBe(secondPng)
    expect(logger.debug).toHaveBeenCalledWith("PNG 'circle-png' retrieved from cache")
  })

  it('should not cache when no key provided', async () => {
    const png = await toPNG(mockParams, cache)
    expect(png).toBe('data:image/png;base64,mock-png-data')
    expect(cache.size).toBe(0)
  })
})
