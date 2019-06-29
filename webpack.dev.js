const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DIST_DIR = path.resolve(__dirname,"dist");
const fileNameConfig = process.env.NODE_ENV !== 'devS' ?  "[name].[chunkhash].bundle.js" : "[name].bundle.js";
const OUTPUT_PATH = path.join(__dirname,'./dist/')
var SRC_DIR = path.resolve(__dirname,"src");
module.exports={
    entry: {
      app: SRC_DIR,
      vendor: ['react', 'react-dom','axios']
    },
    output: {
        path: OUTPUT_PATH,
        filename: fileNameConfig,
        publicPath: '/'
    },

    devtool:'inline-source-map',

    devServer:{
        contentBase:"./dist",
        historyApiFallback: true
    },

    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'),
    ],

    module:{
        rules:[

            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:[
                    'babel-loader',
                ],
            },
            //
            // {
            //     test:/\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         use:'css-loader',
            //     }),
            // },
            //
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'sass-loader!style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },

    resolve:{
        extensions:['.js','.jsx'],
    },

};
