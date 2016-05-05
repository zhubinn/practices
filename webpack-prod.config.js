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
            immutable: path.join(__dirname, 'node_modules/immutable/dist/immutable.min'),
            moment: path.join(__dirname, 'node_modules/moment/min/moment-with-locales.min'),
            react: path.join(__dirname, 'node_modules/react/dist/react-with-addons.min'),
            redux: path.join(__dirname, 'node_modules/redux/dist/redux.min'),
            'react-dom': path.join(__dirname, 'node_modules/react-dom/dist/react-dom.min'),
            'react-proxy': path.join(__dirname, 'node_modules/react-proxy/dist/ReactProxy'),
            'react-redux': path.join(__dirname, 'node_modules/react-redux/dist/react-redux.min'),
            'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min'),
            'react-logger': path.join(__dirname, 'node_modules/react-logger/dist/index.min'),
            'react-thunk': path.join(__dirname, 'node_modules/react-thunk/dist/redux-thunk.min'),
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
    devtool: 'source-map',
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
};
