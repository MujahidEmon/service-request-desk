const { MongoClient } = require("mongodb");


const client = new MongoClient(process.env.MONGO_URI)
let database;
async function dbConnect(){
    if(database){
        return database;
    }

    await client.connect();
    database = client.db(process.env.DB_NAME)

    console.log('Mongo connection successful');
}

  function getDatabase() {
    if (!database) {
      throw new Error("Db is not conn");
    }

    return database;
  }

  module.exports = {
    dbConnect,
    getDatabase,
  };

