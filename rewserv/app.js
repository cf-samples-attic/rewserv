/**
 * Module dependencies.
 */
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || '127.0.0.1');
var express = require('express');
// var communityUser = require(__dirname + '/logic/communityUser.js');
var hubbubSubscriber = require('./lib/hubbubSubscriber');

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

app.get('/hubbub', function(req, res) {
    console.log(req.param('hub.challenge'));
    res.send(req.param('hub.challenge'), 200);
});

app.post('/hubbub', hubbubSubscriber.postactivity, function(req, res) {
    console.log(req.body);
});

app.get('/activity', hubbubSubscriber.getactivity, function(req, res) {
//  console.log(req);
  res.json({'Warning':'Parameter missing'});
});

app.put('.*', function(req, res) {
  res.json({'Warning':'Not implemented'});
});

app.del('.*', function(req, res) {
  res.json({'Warning':'Not implemented'});
});

//console.log('http://'+host+':'+port);
app.listen(port, host);
