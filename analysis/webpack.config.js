/* 
    Steps to create production bundles for apps with traditional* architecture
        See webpack.config.js for projects built in React etc
        * This does still assume modular js w/a single entry point (i.e. index.js). Monorepos also work.
    
    The output from these steps are:
        A minified, (polyfilled) production bundle for your javascript
        Minified HTML pages 
        Minified CSS
        The rest of your static assets

    DEV-DEPENDENCIES (npm i --save-dev):
        "copy-webpack-plugin": "^7.0.0",
        "css-loader": "^5.0.1",
        "css-minimizer-webpack-plugin": "^1.1.5",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^4.5.0",
        "mini-css-extract-plugin": "^1.3.3",
        "path": "^0.12.7",
        "style-loader": "^2.0.0",
        "webpack": "^5.10.3",
        "webpack-cli": "^4.2.0"
        
    DEPENDENCIES (npm i) if necessary
        @babel/polyfill 
*/

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");



/***** Steps to copy and minify existing HTML files using html-webpack-plugin *****/
// Use this for individual files (i.e. index.html)
let indexConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname + "/index.html"),
    file: 'index.html',
    inject: 'head',
    scriptLoading: 'defer',
    hash: true,
    minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: true
    }
})
/***** END bundling HTML *****/



/***** JS/CSS Bundle + Static Assets creation *****/
module.exports = {
    // note: you can just have './js/index.js' if babel isn't needed but it must still be in an array
    entry: ['./js/index.js'],
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            // load styles
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader'
                ]
            },
            // load imgs
            {
                // cover all test cases (do you have .jpg or otherwise? add to test case)
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './img',
                    to: 'img',
                    toType: 'dir'
                },
                {
                    from: './css',
                    to: 'css',
                    toType: 'dir'
                }
            ]
        }),
        indexConfig
    ]
}
/***** END bundle *****/