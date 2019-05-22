'use strict';

const path = require('path');
const { dependencies } = require('../../package.json');
const webpack = require('webpack');

let mainConfig = {
  context: path.join(__dirname, '../../'),
  entry: {
    main: path.join(__dirname, '../../src/main/index.ts')
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, '../../tsconfig.json')
        },
        exclude: /node_modules/,
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../../dist')
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json', '.node']
  },
  target: 'electron-main'
};

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig;
