// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Point d'entrée de votre application
  entry: path.join(__dirname, 'index.web.js'),

  // Règles pour le traitement des fichiers
  module: {
    rules: [
      // Règle pour les fichiers JavaScript et JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Règle pour les fichiers CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Règle pour les fichiers d'images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
    ],
  },

  // Configuration des résolutions de module
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@react-navigation/drawer': false,
      'react-native-reanimated': false,
    },
    extensions: ['.web.js', '.js'],
  },

  // Plugins utilisés
  plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
  }),
  new webpack.NormalModuleReplacementPlugin(
    /@react-native-community\/datetimepicker/,
    path.resolve(__dirname, './empty-module.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /react-native-image-picker/,
    path.resolve(__dirname, './empty-module.js')
  ),
  ],

  // Configuration du serveur de développement
 devServer: {
  static: {
    directory: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  compress: true,
  port: 8080,
  historyApiFallback: true,
},
};
