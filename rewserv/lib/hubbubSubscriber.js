var reg = require('./register');

exports.postHubbub = function(req,res,next) {

    if(!req.body.items) {
        console.log('no items to save');
        next();
    }

/*
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
*/
};

