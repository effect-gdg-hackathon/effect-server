const { MongoClient } = require('mongodb');
let collection = undefined;

exports.effectCollection = (() => {
    if (collection !== undefined) {
        return collection
    }

    const url = 'mongodb://0.tcp.jp.ngrok.io:18602';
    const client = new MongoClient(url);

    const db = client.db('effect');

    collection = db.collection('effects');

    return collection
})()