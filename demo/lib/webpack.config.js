var path = require('path')
var debug=process.env.NODE_ENV !== "production";
var webpack = require('webpack')

module.exports = {
  devtool: debug?'eval-cheap-module-source-map':null,
  entry: [
    'webpack-hot-middleware/client',
    __dirname+'/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    
  },
  plugins:debug ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({sourcemap:false})
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourceMap: false }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query:{presets:['es2015','react']
          }
      }
    ]
  }
}
