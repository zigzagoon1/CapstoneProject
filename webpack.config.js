// import { resolve } from 'path';

// export const entry = './src/index.js';
// export const output = {
//   filename: 'bundle.js', // Output file name
//   path: resolve(__dirname, 'dist'), // Output directory
// };
// export const module = {
//   rules: [
//     {
//       test: /\.js$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader', // You may need to install babel-loader
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
//         },
//       },
//     },
//     //Image handling rule
//     {
//       test: /\.(png|svg|jpg|jpeg|gif)$/i,
//       type: 'asset/resource'
//     }
//   ],
// }

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Your existing JS rule
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Image handling rule
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './public'), 'node_modules'],
    // Optionally, add an alias for your images directory
    alias: {
      Images: path.resolve(__dirname, 'client/public/images'),
    },
  },
};