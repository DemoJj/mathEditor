const Path = require('path')

function resolve(path) {
    return Path.join(__dirname, path)
}
module.exports = {
    entry: resolve('./src/js/main.js'),
    output: {
        path: resolve('./dist'),
        filename: 'mathEdit.min.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    }
}