// exports.MONGODB_URL = 'mongodb+srv://lalu_ecommerce:123@cluster0.9zx9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const mongodb = require("mongodb");
const initConfig = require('./env/development');

const MongoClient = mongodb.MongoClient;

const MONGODB_URL = initConfig.MONGODB_URL;

let _db;

const initDb = callback => {
    if (_db) {
        console.log("Database is already initialized!");
        return callback(null, _db)
    }
    MongoClient.connect(MONGODB_URL)
        .then(client => {
            _db = client;
            return callback(null, _db)
        })
        .catch(err => {
            callback(err);
        })
}

const getDb = () => {
    if (!_db) {
        throw Error("Database not initialized");
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}