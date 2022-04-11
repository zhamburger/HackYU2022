var webpack = require( 'webpack' );

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: [ 'babel-loader?presets[]=react' ],
      }
    ],
  },
};