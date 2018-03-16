class Database {
  constructor() {
    this.client;
  }

  setClient(client) {
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  getDb() {
    if(this.client) {
      return this.client.db();
    }
    return false;
  }
}

module.exports = new Database();