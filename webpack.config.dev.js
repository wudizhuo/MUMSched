var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        use: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=25000'
      }]
  }
};