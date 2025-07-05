const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Якщо потрібно копіювати файли

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.[contenthash].js', //  Хешування
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], //  CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, //  Зображення
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/i, //  Шрифти
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', //  Для сучасного JS
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), //  Очищення dist
    new HtmlWebpackPlugin({
      template: './src/index.html', // якщо є свій шаблон
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', //  Хешування CSS
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all', // Зовнішні бібліотеки в окремий chunk
    },
  },

  devServer: {
    static: './dist',
    open: true,
  },

  mode: 'production', // або 'development'
};
