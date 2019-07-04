const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeModules = fs
  .readdirSync('node_modules')
  .reduce((acc, item) => {
    if (['.bin'].indexOf(item) === -1) {
      acc[item] = `commonjs ${ item }`;
    }

    return acc;
  }, {});

module.exports = {
  entry: './src/app',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@root': path.resolve(__dirname),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@tests': path.resolve(__dirname, 'src', 'tests'),
    }
  },
  externals: nodeModules,
  target: 'node',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    })
  ]
};
