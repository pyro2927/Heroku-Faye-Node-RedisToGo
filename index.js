var http = require('http'),
    faye = require('faye'),
    redis = require('faye-redis');

var rtg   = require("url").parse(process.env.REDISTOGO_URL);
var bayeux = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 60,
  engine: {
    type: redis,
    host: rtg.hostname,
    port: rtg.port,
    password: rtg.auth.split(":")[1]
  }
});
// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.write('Hello, non-Bayeux request');
  response.end();
});

bayeux.attach(server);
var port = process.env.PORT || 8000;
server.listen(port);
