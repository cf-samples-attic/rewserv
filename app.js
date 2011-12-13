/**
 * Module dependencies.
 */
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || '172.16.24.150');
var express = require('express');
var auth= require(__dirname + '/node_modules/express/node_modules/connect-auth');
var communityUser = require(__dirname + '/logic/communityUser.js');

var app = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
//  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.cookieParser());
  app.use(express.session({ secret: "string" }));
//  app.use(auth([
//    auth.Facebook({appId : fbId, appSecret: fbSecret, scope: "email", callback: fbCallbackAddress})
//  ]));
});

/*
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
*/

// Routes

//app.get('/', function(req, res) {
//
//});

app.get('/activity', function(req, res) {
//  console.log(req);
  res.json({'Warning':'Parameter missing'});
});

app.get('/activity/:email', communityUser.getactivity, function(req, res) {
  res.json(req.resp);
});

app.get('/logout', function(req, res, params) {
  req.logout();
  res.writeHead(303, { 'Location': "/" });
  res.end('');
});

app.post('/testpost', function(req, res) {
  //console.log(req.body);
  res.json(req.body);
});

app.post('/activity', communityUser.postactivity, function(req, res) {
  res.json(req.resp);
});

app.put('.*', function(req, res) {
  res.json({'Warning':'Not implemented'});
});

app.del('.*', function(req, res) {
  res.json({'Warning':'Not implemented'});
});

//console.log('http://'+host+':'+port);
app.listen(port, host);
