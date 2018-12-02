const { Client } = require("pg");
const keys = require("../Config/keys");
const elasticsearch = require("elasticsearch");

exports.getDbConnection = () => {
    let client = new Client({ connectionString: keys.connectionString });
    client.connect();
    return client;
}


exports.getElasticConnection = () => {
var client = new elasticsearch.Client({
    host: 'http://35.200.203.192:9200/',
    requestTimeout: Infinity
});
return client;
}