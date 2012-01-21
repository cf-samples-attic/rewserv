/*
{ status:
   { code: 200,
     http: '17786B in 0.300956593s, 7/15 new entries',
     nextFetch: 1327177249,
     title: 'San Francisco - Twitter Search',
     entriesCountSinceLastMaintenance: 17626,
     period: '90',
     lastFetch: 1327177155,
     lastParse: 1327177155,
     lastMaintenanceAt: 1215824721,
     digest: false,
     feed: 'http://search.twitter.com/search.atom?q=San+Francisco' },
  updated: 1327177155,
  id: 'http://search.twitter.com/search.atom?q=San+Francisco',
  title: 'San Francisco - Twitter Search',
  subtitle: '',
  standardLinks:
   { self: [ [Object] ],
     search: [ [Object] ],
     refresh: [ [Object] ],
     next: [ [Object] ] },
  permalinkUrl: 'http://search.twitter.com/search?q=San+Francisco',
  items:
   [ { id: 'tag:search.twitter.com,2005:160818620010725377',
       postedTime: 1327177121,
       updated: 1327177121,
       title: 'RT @alexaquino: Releases today at BLACK SCALE San Francisco http://t.co/7ifkNbtx',
       summary: '',
       content: 'RT @<a class=" " href="http://twitter.com/alexaquino">alexaquino</a>: Releases today at BLACK SCALE <em>San</em> <em>Francisco</em> <a href="http://t.co/7ifkNbtx">http://t.co/7ifkNbtx</a>',
       permalinkUrl: 'http://twitter.com/papalote415/statuses/160818620010725377',
       image: 'http://a2.twimg.com/profile_images/1746882898/image_normal.jpg',
       actor: [Object] },
     
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HubbubSchema = new Schema({
    activity: {type: String}
});

var hubbub = mongoose.model('hubbub', HubbubSchema);
 
if(process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  //var obj = env['mongodb-1.8'][0]['credentials'];
  var obj = env['mongodb-1.8'][0].credentials;
  mongoose.connect("mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db);
} else {
  //console.log('local db connection');
  mongoose.connect('mongodb://localhost/mongodb-rewservconference');
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
