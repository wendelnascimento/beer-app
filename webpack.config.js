const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: process.env.BEER_APP_ENV || 'production',
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash].js',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: process.env.PORT || '3000',
    open: true,
    compress: true,
    historyApiFallback: true,
  },
};
