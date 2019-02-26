const path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
    plugins: [
        new LiveReloadPlugin(),
        new CopyPlugin([
            { from: 'src/index.html' },
            {
                from: 'src/assets',
                to: 'assets'
            }
        ]),
    ]
};