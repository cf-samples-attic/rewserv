var reg = require('./register');
var route = require('./hubbubRoute');

exports.postHubbub = function(req,res,next) {
  
  var type=false;

  if(!req.body.items) {
    reg.log('Warning: no items to save');
    next();
  }

  var resultSave = route.parseBody(req.body);
  reg.log(resultSave);

};

