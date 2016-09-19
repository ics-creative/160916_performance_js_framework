const webpack = require("webpack");

module.exports = [
  {
    entry: ['./app/main.ts'],
    output: {
      filename: './bundles/webpack.bundle.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin() // minify enabled
    ],
    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'babel-loader!ts-loader' // first ts-loader(with tsconfig.json), second babel-loader
        }
      ]
    },
    // devtool: 'source-map', // output source map
  }
]