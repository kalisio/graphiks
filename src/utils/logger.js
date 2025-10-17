const LEVELS = ['debug', 'info', 'warn', 'error']
let LOG_LEVEL = 'warn'

function shouldLog(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf(LOG_LEVEL)
}

export const Logger = {
  setLevel (level) {
    if (LEVELS.includes(level)) LOG_LEVEL = level
  },
  debug (...args) {
    if (shouldLog('debug')) console.debug('[graphiks:debug]', ...args)
  },
  info (...args) {
    if (shouldLog('info')) console.info('[graphiks]', ...args)
  },
  warn (...args) {
    if (shouldLog('warn')) console.warn('[graphiks:warn]', ...args)
  },
  error (...args) {
    if (shouldLog('error')) console.error('[graphiks:error]', ...args)
  }
}