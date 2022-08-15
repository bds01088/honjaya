const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/honjaya',
    createProxyMiddleware({
      target: 'https://i7e104.p.ssafy.io',
      changeOrigin: true,
    })
  );
};

//또는 package.json 에 "proxy" : "http://localhost:8080" 을 추가해도됨