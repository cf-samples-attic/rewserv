var register = {
    mongoose: require('mongoose')
  , cf: require('cloudfoundry')
  , mongoUrl: function() {
      if(register.cf.cloud) {
        var cfg = register.cf.mongodb['mongo-rewserv'].credentials;
        return "mongodb://"+cfg.username+":"+cfg.password+"@"+cfg.hostname+":"+cfg.port+"/"+cfg.db;
      } else {
        return "mongodb://localhost/mongodb-rewserv";
      }
    }
  , mongoConnected: function() { return register.mongoose.connect(register.mongoUrl()) }
}


module.exports = register;
