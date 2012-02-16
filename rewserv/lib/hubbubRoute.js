hubbubRoute = {
    parse: function(body) {

      // GITHUB COMMIT
      if(body.id.match(/\/\/github.com/)) {
        var source = require('./sourceGithub');
      }

      return source.save(body);
    }
}

module.exports = hubbubRoute;
