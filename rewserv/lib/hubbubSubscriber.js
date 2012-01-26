var cf = require('cloudfoundry');
var mongoose = require('mongoose');
var asmsOptions = {redis:{}};
var mongoUrl = null;

if(cf.cloud) {
    var cfg = cf.mongodb['mongo-asms'].credentials;
    mongoUrl = ["mongodb://", cfg.username, ":", cfg.password, "@", cfg.hostname, ":", cfg.port,"/" + cfg.db].join('');
    if (cf.redis['redis-asms']) {
        var cfg2 = cf.redis['redis-asms'].credentials;
        asmsOptions.redis.port = cfg2.port;
        asmsOptions.redis.host = cfg2.hostname;
        asmsOptions.redis.pass = cfg2.password;
    }
} else {
    asmsOptions.redis.port = 6379;
    asmsOptions.redis.host = "127.0.0.1";
    mongoUrl = "mongodb://localhost/mongodb-asms";
}
mongoose.connect(mongoUrl);

var asmsDB = require('activity-streams-mongoose')(mongoose, asmsOptions);

exports.getActivityStream = function(req,res,next) {
    var streamName = 'firehose';
        console.dir(req.params);
    if (req.params['streamName']) {
      streamName = req.params['streamName'];
    }

    asmsDB.getActivityStream(100, function (err, docs) {
        req.activities = docs;
        console.log(req.activities);
        next();
    });

};

exports.postActivityStream = function(req,res,next) {

    if(!req.body.items) {
        console.log('no items to save');
        next();
    }

    // TODO: Verify the PuSH with the shared secret

    var target = new asmsDB.ActivityObject({ displayName: req.body.title, url: req.body.id });

    target.save(function(err) {
        if (err === null) {
          req.body.items.forEach(function(val, index, array) {
            var actor = { displayName: val.actor.displayName, url: val.actor.permalinkUrl};

            if (val.standardLinks && standardLinks.thumbnail.count > 0) {
                actor.image =  {url: val.standardLinks.thumbnail[0].href};
            }

            asmsDB.publish('firehose', new asmsDB.Activity({
              actor: actor,
              object:{ displayName: val.title, url: val.permalinkUrl },
              title: val.title,
              url: val.permalinkUrl,
              content: val.content
            }));

          });
    }});
};

