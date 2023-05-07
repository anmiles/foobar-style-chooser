const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry  : './src/index.ts',
	output : {
		filename : 'index.js',
	},
	mode   : 'development',
	module : {
		rules : [
			{
				test    : /\.tsx?$/,
				use     : 'ts-loader',
				exclude : /node_modules/,
			},
		],
	},
	resolve : {
		extensions : [ '.ts', '.js' ],
	},
	plugins : [
		new CopyWebpackPlugin({
			patterns : [
				{
					from        : 'src',
					globOptions : {
						ignore : [ '**/*.ts' ],
					  },
				},
			],
		}),
	],
};
