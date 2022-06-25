const { MongoClient } = require('mongodb');
let _effectCollection = undefined;
let _postIdCollection = undefined;

function loadClient() {
    const url = process.env.MONGO_URI;
    if (!url) {
        throw new Error('MONGO_URI is not defined');
    }
    
    const client = new MongoClient(url);

    return client
}

exports.effectCollection = (() => {
    if (_effectCollection !== undefined) {
        return _effectCollection
    }

    const client = loadClient();
    const db = client.db('effect');

    _effectCollection = db.collection('effects');

    return _effectCollection
})()

exports.postIdCollection = (() => {
    if (_postIdCollection !== undefined) {
        return _postIdCollection
    }

    const client = loadClient();

    const db = client.db('effect');

    _postIdCollection = db.collection('postId');

    return _postIdCollection
})()