const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const appSettings = require('./settings/app-settings');
const workboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
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
    new WebpackPwaManifest({
        name: appSettings.title,
        short_name: appSettings.shortTitle,
        description: appSettings.title,
        background_color: '#001234',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
            {
                src: path.resolve('src/assets/icon-192x192.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            },
            {
                src: path.resolve('src/assets/icon-512x512.png'),
                size: '1024x1024' // you can also use the specifications pattern
            }
        ]
    }),
    new workboxPlugin.InjectManifest({
        swSrc: './src/scripts/sw.js',
        swDest: 'firebase-messaging-sw.js'
    })
];

module.exports = {
    mode: PRODUCTION ? 'production' : 'development',
    entry: {
        index: PRODUCTION ? ['./src/scripts/client/index.tsx'] : ['./src/scripts/client/index.tsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: PRODUCTION ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js',
        chunkFilename: PRODUCTION ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js',
    },
    optimization: PRODUCTION ? {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all'
        }
    } : {},
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
