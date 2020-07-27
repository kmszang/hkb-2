const path = require('path')
const babelConfig = require('./babel.config')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    test: ['./src/index.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'babel-loader',
          // options: { ...babelConfig() },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|s[ca]ss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'build.js',
  },
}
