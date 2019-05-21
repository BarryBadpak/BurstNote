const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const nodeModulePath = path.resolve(require.resolve("electron"), "..", "..");

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, 'src/renderer/index.ejs'),
            minify: false,
            nodeModules: nodeModulePath
        })
    ]
};
