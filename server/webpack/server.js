import { readFileSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';
import cssNext from 'postcss-cssnext';

const babel = JSON.parse(readFileSync('./.babelrc', 'utf8'));
const presets = babel.presets || [];

const config = {
    entry: {
        render: './server/render.js',
        routes: './app/routes.js'
    },
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ...presets
                    ],
                    plugins: babel.plugins
                }
            },
            {
                // https://github.com/webpack/css-loader/issues/59#issuecomment-109793167
                test: /\.css$/,
                loaders: [
                    'css-loader/locals?modules&localIdentName=[local]_[hash:base64:5]',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9.=]+)?$/,
                loader: 'file-loader?emitFile=false'
            }
        ],
    },
    postcss: () => ([
        cssNext
    ]),
    output: {
        path: resolve('./server/build'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins || [];
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
