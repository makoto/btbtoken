const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './app/javascripts/client/eventtoken.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ])
  ],
  module: {
    // rules: [
    //   {
    //    test: /\.css$/,
    //    use: [ 'style-loader', 'css-loader' ]
    //   }
    // ],
    // loaders: [
      // { test: /\.json$/, use: 'json-loader' },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: 'babel-loader',
      //   query: {
      //     presets: ['es2015', 'react'],
      //     plugins: ['transform-runtime']
      //   }
      // }
      loaders: [
          {
              loader: 'babel-loader',
              exclude: /node_modules/,
              test: /\.js[x]?$/,
              query: {
                  cacheDirectory: true,
                  presets: ['react', 'es2015']
              }
          }
      ]
    // ]
  }
}
