/**
 * Created by c on 16/3/21.
 */
var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'http://localhost:8082/lib/',
        filename: '[name].js',
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
            'react-slick': path.join(__dirname, 'node_modules/react-slick/dist/react-slick.min'),
            'react-proxy': path.join(__dirname, 'node_modules/react-proxy/dist/ReactProxy'),
            'react-redux': path.join(__dirname, 'node_modules/react-redux/dist/react-redux.min'),
            'react-router': path.join(__dirname, 'node_modules/react-router/umd/ReactRouter.min'),
            'react-logger': path.join(__dirname, 'node_modules/react-logger/dist/index.min'),
            'react-thunk': path.join(__dirname, 'node_modules/react-thunk/dist/redux-thunk.min'),
        },
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 8082,
    },
    devtool: 'source-map',
};
