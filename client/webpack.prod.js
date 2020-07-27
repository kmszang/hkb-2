const commonConfig = require('./webpack.common')

/** @type {import('webpack').Configuration} */
module.exports = {
  ...commonConfig,
  mode: 'production',
}
