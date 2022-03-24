const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("instaclone");
        console.log("Successfully connected to MongoDB");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
