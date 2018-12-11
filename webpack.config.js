const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const appSettings = require('./settings/app-settings');
const loaders = [
    'style-loader',
    {
        loader: require.resolve('typings-for-css-modules-loader'),
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            namedExport: true,
            camelCase: true
        },
    },
    {
        loader: 'postcss-loader'
    }
];
const PRODUCTION = process.env.NODE_ENV === 'production';
const webpackPlugins = [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: appSettings.title,
        description: appSettings.title,
        viewport: appSettings.viewport,
        font: appSettings.font,
        filename: appSettings.filename,
        template: appSettings.template
    }),
    new MiniCssExtractPlugin({
        filename: '/css/[name].css',
        chunkFilename: '/css/[id].css'
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer()
            ]
        }
    }),
    new Dotenv({
        path: './.env', // load this now instead of the ones in '.env'
        safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    })
];

module.exports = {
    mode: PRODUCTION ? 'production' : 'development',
    optimization: PRODUCTION ? {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    } : {},
    entry: {
        index: PRODUCTION ? ['./src/scripts/client/index.tsx'] : ['./src/scripts/client/index.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: PRODUCTION ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        hot: true,
        stats: {
            assets: true,
            children: false,
            chunks: true,
            hash: false,
            modules: true,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: true
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css/,
                use: loaders
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: PRODUCTION ? webpackPlugins : [
        ...webpackPlugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
