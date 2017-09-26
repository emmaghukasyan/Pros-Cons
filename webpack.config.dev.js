const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',

    'react-hot-loader/patch',
     // activate HMR for React

    'webpack-dev-server/client?http://localhost:8000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './main.js'
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle
    path: path.resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  resolve: {
    modules: [
       path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.png'],
    alias: {
      components: path.resolve(__dirname, 'src/components')
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    new HtmlWebpackPlugin({
      title: 'New React Project',
      template: 'index.ejs'
    })
  ],

  module: {
    rules: [
      {   test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: __dirname + './node_modules/react-flexbox-grid',
      },
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css?modules!sass',
        include: __dirname + './node_modules/react-flexbox-grid',
        exclude: /(node_modules)/
      },
      {
        test: /\.(ttf|eot|svg|woff|png)(\?[a-z0-9]+)?$/,
        use: [
          { loader: 'file-loader?name=[path][name].[ext]' }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  }
};
