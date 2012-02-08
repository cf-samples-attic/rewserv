var reg = require('./register.js');

var Schema = reg.mongoose.Schema;

var UsersSchema = new Schema({
    email: {type: String},
    joindate: {type: String},
    posts: {type: String}
});

var users = reg.mongoose.model('users', UsersSchema);
 
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

