const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const NodemonPlugin = require('nodemon-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  // filename: '[name].[contenthash].css',
  filename: '[name].css',
  allChunks: true,
  // disable: process.env.NODE_ENV === 'development'
});

// fix node modules build error
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
  // SERVER
  {
    entry: './src/server/app.ts',
    mode: 'development',
    target: 'node',
    node: {
      __dirname: true
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist')
    },
    externals: nodeModules,
    module: {
      rules: [
        { test: /\.ts/, use: 'ts-loader'},
      ],
    },
    plugins: [
      new CleanWebpackPlugin('./dist'),
      new NodemonPlugin({
        // What to watch.
        watch: path.resolve('./dist'),
        // // Files to ignore.
        // ignore: ['*.js.map'],
        script: './dist/app.js'
      }),
    ],
    resolve: {
      extensions: ['.ts', 'tsx', '.js', '.vue', '.json', 'scss', 'css', 'sass', 'html'],
      alias: {
        '@': path.resolve(__dirname, 'src', 'server'),
        '#': path.resolve(__dirname, 'src', 'client'),
        'types': path.resolve(__dirname, 'src', 'types'),
        'config': path.resolve(__dirname, 'config'),
        'root': path.resolve(__dirname),
      }
    },
  }, {
    // CLIENT
    mode: 'development',
    entry: './src/client/index.ts',
    target: 'web',
    output: {
      path: path.resolve(__dirname, './dist/public'),
      // publicPath: '/public',
      filename: 'build.js',
    },
    module: {
      rules: [{
        test: /\.(scss|sass|css)$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader',
        })
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?exportAsEs6Default'
      }, {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/client/index.html',
      }),
      extractSass,
    ],
    resolve: {
      extensions: ['.ts', 'tsx', '.js', '.vue', '.json', 'scss', 'css', 'sass', 'html'],
      alias: {
        '@': path.resolve(__dirname, 'src', 'server'),
        '#': path.resolve(__dirname, 'src', 'client'),
        'types': path.resolve(__dirname, 'src', 'types'),
        'config': path.resolve(__dirname, 'config'),
        'vue$': 'vue/dist/vue.esm.js',
        'root': path.resolve(__dirname),
      }
    },
}];
