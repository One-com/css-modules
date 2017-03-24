import { readFileSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import cssNext from 'postcss-cssnext';

const babel = JSON.parse(readFileSync('./.babelrc', 'utf8'));
const presets = babel.presets || [];

const config = {
    entry: {
        client: './client'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ...presets,
                        'es2015'
                    ],
                    plugins: [
                        ...babel.plugins,
                        'transform-async-to-generator'
                    ]
                }
            },
            {
                // https://github.com/webpack/css-loader/issues/59#issuecomment-109793167
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:5]!postcss-loader'
                )
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9.=]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path: resolve('./server/build'),
            filename: 'assets.json'
        }),
        new ExtractTextPlugin('[contenthash].css')
    ],
    postcss: () => ([
        cssNext
    ]),
    output: {
        path: resolve('./public'),
        filename: '[hash].js'
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    );
}

export default config;
