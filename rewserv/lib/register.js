var register = {
    mongoose: require('mongoose')
  , cf: require('cloudfoundry')
  , mongoUrl: function() {
      if(register.cf.cloud) {
        var cfg = register.cf.mongodb['mongo-giors'].credentials;
        return "mongodb://"+cfg.username+":"+cfg.password+"@"+cfg.hostname+":"+cfg.port+"/"+cfg.db;
      } else {
        return "mongodb://localhost/mongodb-rewserv";
      }
    }
  , mongoConnected: function() {
      return register.mongoose.connect(register.mongoUrl());
    }
  , usersMongoSchema: function() {
      var Schema = register.mongoose.Schema;
      var UsersSchema = new Schema({
          email: {type: String}
        , joindate: {type: String}
        , values: [ {source: 'springsource-forum', count: 0} ]
      });
      return UsersSchema;
    }
  , log: function(msg) {
      if(register.cf.cloud) {
      } else {
        console.log(msg);
      }
    }
}


module.exports = register;
