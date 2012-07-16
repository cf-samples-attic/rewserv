var reg = require('./register');

exports.postHubbub = function(req,res,next) {
  
  var type=false;

  if(!req.body.items) {
    reg.log('Warning: no items to save');
    next();
  }

  // GITHUB COMMIT
  if(req.body.id.match(/\/\/github.com/)) {
    var source = require('./sourceGithub');
  }

  var resS = source.save(req.body);
  reg.log(resS);

};

