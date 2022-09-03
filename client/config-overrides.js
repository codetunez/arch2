var webpack = require('webpack');

module.exports = {
    webpack: function override(config, env) {

    config.module.rules = [
        ...config.module.rules,
        {
            test: /\.mjs/,
            type: "javascript/auto"
        }
    ]
    
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
        })
    ]

    return config;
}}