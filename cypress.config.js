const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeigth: 600,
  viewportWidth: 1000,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
