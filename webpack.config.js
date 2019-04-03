const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// publicPath = '../../';
module.exports = {
	entry: {
		app:'./src/app.js',
		vendor:['react','react-router-dom','react-dom','react-redux','react-cropper','echarts-for-react']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkHash:5].js',
		publicPath:WEBPACK_ENV==='dev'? '/dist/': ''
	},
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'src/pages')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','react','stage-2'],
						plugins: [["import", { "libraryName": "antd" , libraryDirectory:'es',"style": true }]]
					}
				}
			},
			{
				test: /\.css$/,
				exclude:/(node_modules|antd\.css)/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader?modules&localIdentName=[name]-[hash:base64:5]"]
				})
			 },
			 {
				test: /\.scss$/,
				exclude:/(node_modules)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules&localIdentName=[name]-[hash:base64:5]', 'sass-loader']
				})
		 	},
			{
						test: /\.css$/,
						include:/(node_modules|antd\.css)/,
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: ["css-loader"]
		        })
		   },
		   {
						test: /\.scss$/,
						include:/(node_modules|antd\.css)/,
		        use: ExtractTextPlugin.extract({
		          fallback: 'style-loader',
		          use: ['css-loader', 'sass-loader']
		        })
				 },
				 {
					test: /\.less$/,
					include:/(node_modules|antd\.less)/,
					use: [
							"style-loader",
							"css-loader",
							{
									loader:"less-loader",
									options:{
											modifyVars:{
													"primary-color":"#F4A12F"
											},
											javascriptEnabled: true
									}
							}
					]
				},
	     	{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name]-[hash:base64:5].[ext]'
		            }
		          }
		        ]
		    },
		    {
		        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'resource/[name]-[hash:base64:5].[ext]'
		            }
		          }
		        ]
		    }
		]
	},
	resolve:{
		alias:{
			components : path.resolve(__dirname,'src/components'),
			pages      : path.resolve(__dirname,'src/pages'),
			common		 : path.resolve(__dirname,'src/common'),
			store 		 : path.resolve(__dirname,'src/store'),
			util			 : path.resolve(__dirname,'src/util'),
			api				 : path.resolve(__dirname,'src/api'),
			images 		 : path.resolve(__dirname,'src/images'),
			// config 		 : path.resolve(__dirname,'src/config'),
			base       : path.resolve(__dirname,'src'),
			test			 : path.resolve(__dirname,'test')
		}
	},
	devServer: {
			 port:9990,
			 historyApiFallback:{
				index:'/dist/index.html'
			},
			host:'0.0.0.0'
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon:'./favicon.ico'
		}),
		new ExtractTextPlugin("css/[name].[chunkHash:5].css"),
		//提出公共模块
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name:'common',
		// 	filename:'js/base.[chunkHash:5].js'
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendor','runtime'],
			filename:'js/[name].[chunkHash].js'
		})
	]
};