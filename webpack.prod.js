const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
})


module.exports={

    entry:path.join(__dirname,'./src/index.js'),

    output:{
        path:path.join(__dirname,'./dist/'),
        filename:'bundle.[chunkhash].js',
        publicPath: '/'
    },

    devtool:'inline-source-map',

    devServer:{
        contentBase:"./dist",
        historyApiFallback: true
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
        }),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          compress: {
            warnings: false,
          },
        }),
        new ExtractTextPlugin('style.[chunkhash].css'),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new webpack.NamedModulesPlugin(),
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

            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      { loader: 'css-loader', options: { minimize: true } }
                  ]
              })
            },

            {
                test:/.(png|jpg|gif)$/,
                use:[
                    'file-loader'
                ],
            },

        ],
    },

    resolve:{
        extensions:['.js','.jsx'],
    },

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
