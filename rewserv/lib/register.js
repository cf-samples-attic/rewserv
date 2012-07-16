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
  , mongoConnect: function() {
      return register.mongoose.connect(register.mongoUrl());
    }
  , mongoSchema: function() {
      return  register.mongoose.Schema;
    }
  , usersMongoModel: function() {
      var Schema = register.mongoSchema();
      var UsersSchema = new Schema({
          sessionID: {type: String}
        , email: {type: String}
        , values: {type: String}
      });
      var usersModel = register.mongoose.model('users',UsersSchema);
      return usersModel;
    }
  , log: function(msg) {
      if(register.cf.cloud) {
      } else {
        console.log(msg);
      }
    }
}

module.exports = register;
