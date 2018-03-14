class Database {
  constructor() {
    this.db;
  }

  setDb(db) {
    this.db = db;
  }

  getDb() {
    return this.db;
  }
}

module.exports = new Database();