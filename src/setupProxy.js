const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://emiswap-oracle-eth-with-polygon.testingtruedao.com',
      changeOrigin: true,
      secure: false,
      logLevel: 'error',
      pathRewrite: {
        '^/api': '',
      },
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    }),
  );
};
