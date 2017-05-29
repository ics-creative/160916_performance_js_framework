module.exports = {
  entry: './src/example.jsx',

  output: {
    path    : __dirname + '/build',
    filename: 'example.js'
  },

  module : {
    loaders: [
      {
        test   : /\.jsx$/,
        loader : 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
};