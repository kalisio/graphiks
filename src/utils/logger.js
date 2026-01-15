const LEVELS = ['debug', 'info', 'warn', 'error']
let LOG_LEVEL = 'warn'
let LOGGER = null

function log (level, ...args) {
  if (LEVELS.indexOf(level) < LEVELS.indexOf(LOG_LEVEL)) return
  if (LOGGER && typeof LOGGER[level] === 'function') {
    LOGGER[level](...args)
  } else if (console) {
    console[level](...args) // eslint-disable-line no-console
  }
}

export const Logger = {
  setLogger (logger) {
    LOGGER = logger
  },
  setLevel (level) {
    if (LEVELS.includes(level)) LOG_LEVEL = level
  },
  debug (...args) {
    log('debug', '[graphiks:debug]', ...args)
  },
  info (...args) {
    log('info', '[graphiks]', ...args)
  },
  warn (...args) {
    log('wan', '[graphiks]', ...args)
  },
  error (...args) {
    log('error', '[graphiks]', ...args)
  }
}
