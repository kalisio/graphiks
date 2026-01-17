import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    silent: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true
    },
    testTimeout: 30000
  }
})
