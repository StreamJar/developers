const merge = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(config, {
	mode: 'production',
	output: {
		filename: '[name].[chunkhash].bundle.js',
		path: path.join(__dirname, './dist'),
		chunkFilename: '[name].[chunkhash].bundle.js',
		publicPath: '/',
	},

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					enforce: true,
					chunks: 'all'
				}
			}
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new CopyWebpackPlugin([
			{ from: path.join(__dirname, "./node_modules/@streamjar/ui-shared/assets"), to: 'assets' },
			{ from: path.join(__dirname, "./src/assets"), to: 'assets' }
		])
	]
});
