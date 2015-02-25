var config = {
    entry: './app/Dashboard.js',
    output: {
        path: './public/js',
        filename: 'dashboard.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx'
        },
        {
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    }
};

module.exports = config;
