'use strict';

const glob = require('glob');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { join } = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: join(__dirname, 'dist')
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.global\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: glob.sync('./node_modules').map((d) => path.join(__dirname, d)),
							}
						}
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /\.global\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: glob.sync('./node_modules').map((d) => path.join(__dirname, d)),
							}
						}
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]',
				},
			},
		],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/highlight\.js\/lib\/languages$/,
			new RegExp(`^./(typescript)$`),
		),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: join('src', 'index.html'),
		}),
	],
	devServer: {
		contentBase: [
			path.join(__dirname, "./node_modules/@streamjar/ui-shared"),
			path.join(__dirname, "./src"),

		],
		watchContentBase: true,
		port: 8081,
		historyApiFallback: true
	}
};
