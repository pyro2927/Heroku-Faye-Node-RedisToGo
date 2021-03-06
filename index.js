var http = require('http'),
    fs = require('fs'),
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
var server = http.createServer(function(request, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  fs.readFile(__dirname + '/index.html', function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

bayeux.attach(server);
var port = process.env.PORT || 8000;
server.listen(port);
