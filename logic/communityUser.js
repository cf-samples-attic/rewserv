/*
this.title = "User activity";
this.name = "user activity";
this.version = "0.0.1";
this.endpoint = "http://localhost:8080";
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {type: String},
    joindate: {type: String},
    posts: {type: String}
});

var users = mongoose.model('users', UsersSchema);
 
if(process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  //var obj = env['mongodb-1.8'][0]['credentials'];
  var obj = env['mongodb-1.8'][0].credentials;
  mongoose.connect("mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db);
} else {
  //console.log('local db connection');
  mongoose.connect('mongodb://localhost/mongodb-rewserv');
}

exports.getactivity = function(req,res,next) {
  //console.log(res);
  users.findOne({'email': req.params.email}, function(err,dbret) {
    req.resp = dbret;
    if(err) { 
      req.resp = {'Error':err}; 
      next(); 
    }
    if(dbret === null) { 
      req.resp = {'Warning':'No user found'}; 
      next(); 
    } else { 
      req.resp = dbret; 
      next(); 
    }
  });
};

exports.postactivity = function(req,res,next) {
  //console.log(req.body);
  if(!req.body.email || !req.body.joindate || !req.body.posts) {
    req.resp = {'Warning':'Parameter missing'};  
    next();
  }
  //var user = new users({'email': req.body.email, 'joindate': req.body.joindate, 'posts': req.body.posts});
  //users.remove({'email': req.body.email});
  users.update({'email': req.body.email}, {$set:{'joindate': req.body.joindate, 'posts': req.body.posts}}, { upsert: true, multi: false}, function() {
    users.find({'email': req.body.email}, function(err,dbret) {
      req.resp = dbret;
      if(err) { 
        req.resp = {'Error':err}; 
        next(); 
      }
      if(dbret === null) { 
        req.resp = {'Error':'User not updated or created'}; 
        next(); 
      } else { 
        req.resp = dbret; 
        next(); 
      }
    });
  });
};

/*
exports.activity.description = "this is the getuseractivity method";
exports.activity.schema = {
  email: { 
    type: 'string',
    optional: false 
  }
};
*/
