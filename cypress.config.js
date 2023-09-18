const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeigth: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
