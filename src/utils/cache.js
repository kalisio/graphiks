const CACHE = {}

export const Cache = {
  get (key) {
    return CACHE[key]
  },
  put (key, shape) {
    CACHE[key] = shape
  }
}
