const { MongoClient } = require('mongodb');
let _effectCollection = undefined;
let _postIdCollection = undefined;

exports.effectCollection = (() => {
    if (_effectCollection !== undefined) {
        return _effectCollection
    }

    const url = 'mongodb://0.tcp.jp.ngrok.io:18602';
    const client = new MongoClient(url);

    const db = client.db('effect');

    _effectCollection = db.collection('effects');

    return _effectCollection
})()

exports.postIdCollection = (() => {
    if (_postIdCollection !== undefined) {
        return _postIdCollection
    }

    const url = 'mongodb://0.tcp.jp.ngrok.io:18602';
    const client = new MongoClient(url);

    const db = client.db('effect');

    _postIdCollection = db.collection('postId');

    return _postIdCollection
})()