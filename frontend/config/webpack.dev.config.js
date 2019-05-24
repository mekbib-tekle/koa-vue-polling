
const webpack = require('webpack');

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 8081,
        },
        auth: 'rumui:lohim4rj4rahka',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
};
