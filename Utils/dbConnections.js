const { Client } = require("pg");
const keys = require("../Config/keys")

exports.getDbConnection = () => {
    let client = new Client({ connectionString: keys.connectionString });
    client.connect();
    return client;
}