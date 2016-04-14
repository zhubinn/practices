/**
 * Created by c on 16/3/21.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './lib',
        filename: '[name].js'
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
            ucjs_modules: path.join(__dirname, 'ucjs_modules'),
        }
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/,
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: 'url',
        }, {
            test: /\.(less)$/,
            loaders: ['style', 'css', 'less'],
        }, {
            test: /\.(css)$/,
            loaders: ['style', 'css'],
        }]
    },
    //devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
            jQuery: 'ucjs_modules/jquery/1.12.2/jquery',
            $: 'ucjs_modules/jquery/1.12.2/jquery',
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};