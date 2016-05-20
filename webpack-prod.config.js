/**
 * Created by c on 16/3/21.
 */
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var moment = require('moment')

var extractCSS = new ExtractTextPlugin('[name].min.css')
var nowDateStr = moment().format("YYYY-MM-DD HH:mm:ss")

module.exports = {
    entry: './src/index.js',
    output: {
        path: './lib',
        filename: '[name].min.js'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            actions: path.join(__dirname, 'src/actions'),
            components: path.join(__dirname, 'src/components'),
            containers: path.join(__dirname, 'src/containers'),
            reducers: path.join(__dirname, 'src/reducers'),
            store: path.join(__dirname, 'src/store'),
            routes: path.join(__dirname, 'src/routes'),
            moment: path.join(__dirname, 'node_modules/moment/min/moment-with-locales.min'),
            redux: path.join(__dirname, 'node_modules/redux/dist/redux.min'),
            'react-slick': path.join(__dirname, 'node_modules/react-slick/dist/react-slick.min'),
            'react-proxy': path.join(__dirname, 'node_modules/react-proxy/dist/ReactProxy'),
            'react-redux': path.join(__dirname, 'node_modules/react-redux/dist/react-redux.min'),
            'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min'),
            'react-logger': path.join(__dirname, 'node_modules/react-logger/dist/index.min'),
            'react-thunk': path.join(__dirname, 'node_modules/react-thunk/dist/redux-thunk.min'),
        }
    },
    externals: {
        react: 'React',
        immutable: 'Immutable',
        'react-dom': 'ReactDOM',
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: 'url',
        }, {
            test: /\.(less)$/,
            loader: extractCSS.extract(['css', 'less']),
        }, {
            test: /\.(css)$/,
            loader: extractCSS.extract(['css']),
        }]
    },
    //devtool: 'source-map',
    plugins: [
        extractCSS,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10240
        }),
        new webpack.BannerPlugin(`用友超客营销 \n update: ${nowDateStr}`),
    ],
};
