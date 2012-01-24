/*
{
    "status": {
        "code": 200,
        "http": "26492B in 0.404484665s, 1/20 new entries",
        "nextFetch": 1327093567,
        "title": "Recent Commits to spring-integration-scala:master",
        "entriesCountSinceLastMaintenance": 22,
        "period": "225",
        "lastFetch": 1327093333,
        "lastParse": 1327093333,
        "lastMaintenanceAt": 1326850905,
        "digest": false,
        "feed": "https://github.com/SpringSource/spring-integration-scala/commits/master.atom"
    },
    "updated": 1327093333,
    "id": "https://github.com/SpringSource/spring-integration-scala/commits/master.atom",
    "title": "Recent Commits to spring-integration-scala:master",
    "subtitle": "",
    "standardLinks": {
        "self": [{
            "href": "https://github.com/SpringSource/spring-integration-scala/commits/master.atom",
            "title": null,
            "type": "application/atom+xml"
        }]
    },
    "permalinkUrl": "https://github.com/SpringSource/spring-integration-scala/commits/master",
    "items": [{
        "id": "tag:github.com,2008:Grit::Commit/e5f82b1a53168e74caadbff4deff445cc7f6e672",
        "postedTime": 1327092550,
        "updated": 1327092550,
        "title": "more router polishing",
        "summary": "",
        "content": "<pre>m src/main/scala/org/springframework/eip/dsl/Composition.scala\nm src/main/scala/org/springframework/eip/dsl/MessageRouters.scala\nm src/test/scala/demo/DslDemo.scala\nm src/test/scala/org/springframework/eip/dsl/MessageRouterTests.scala\n</pre>\n      <pre style='white-space:pre-wrap;width:81ex'>more router polishing</pre>",
        "permalinkUrl": "https://github.com/SpringSource/spring-integration-scala/commit/e5f82b1a53168e74caadbff4deff445cc7f6e672",
        "standardLinks": {
            "thumbnail": [{
                "href": "https://secure.gravatar.com/avatar/4d20fafe518281f1cdd708bb98ce37e2?s=30&#38;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png",
                "title": "more router polishing",
                "type": "image/jpeg"
            }]
        },
        "actor": {
            "displayName": "Oleg Zhurakousky",
            "permalinkUrl": "https://github.com/olegz"
        }
    }]
}
*/


var mongoose = require('mongoose');
var asmsDB = require('activity-streams-mongoose')(mongoose, {redis:null, defaultActorImage: ''});

if(process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  //var obj = env['mongodb-1.8'][0]['credentials'];
  var obj = env['mongodb-asms'][0].credentials;
  mongoose.connect("mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db);
} else {
  //console.log('local db connection');
  mongoose.connect('mongodb://localhost/mongodb-asms');
}

exports.getactivity = function(req,res,next) {
  //console.log(res);
};

exports.postactivity = function(req,res,next) {

  if(!req.body.items) {
    console.log('no items to save');
    next();
  }

  var target = new asmsDB.ActivityObject({ displayName: req.body.title, url: req.body.id });
//console.log(req.body.title);
//console.log(req.body.id);

  target.save(function(err) {
    if (err === null) {
      req.body.items.forEach(function(val, index, array) {
//console.log(val.actor.displayName);
//console.log(val.title);
//console.log(val.content);
//console.log(val.permalinkUrl);

        var startAct = new asmsDB.Activity({
          actor: { displayName: val.actor.displayName }, 
          object:{ displayName: val.title, url: val.permalinkUrl }, 
          title: val.title 
        });
        startAct.save(function(err) {
          if (err === null) {
            asmsDB.getActivityStream(5, function (err, docs) {
              docs.forEach(function(doc){console.log(doc);});
           });
          } else {
            console.log("Error saving: " + val.title);
            console.log(err);
          }
        });

      });
    }
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
