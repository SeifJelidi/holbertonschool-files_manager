const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const DB = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${process.env.HOST || 'localhost'}:${process.env.HOST || 27017}`;

    this.status = false;

    new MongoClient(uri, { useUnifiedTopology: true }).connect((err, client) => {
      if (err) {
        this.status = false;
      } else {
        this.status = true;
        this.db = client.db(DB);
      }
    });
  }

  isAlive() {
    return this.status;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  async addUser(user) {
    return this.db.collection('users').insertOne(user);
  }

  async userExists(email) {
    return this.db.collection('users').findOne({ email });
  }
}

const dbClient = new DBClient();
export default dbClient;
