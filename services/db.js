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
    return this.client.db();
  }
}

module.exports = new Database();