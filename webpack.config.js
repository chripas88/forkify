const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'js/bundle.js'
  // },
	output: {
    path: __dirname,
    filename: 'dist/js/bundle.js'
  },
	// output: {
	// path: __dirname,
	// publicPath: '/',
	// filename: 'bundle.js'
	// },
	// devServer: {
	// 	contentBase: './dist'
	// },
	plugins: [
		new HtmlWebpackPlugin({
			filename: './dist/index.html',
			template: './src/index.html'
		})
	],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
			}
		]
	}
};