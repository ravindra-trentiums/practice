var MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://localhost:27017/animals', function (err, client) {
    if (err) throw err

    db = client.db('animals')

    //   db.collection('mammals').find().toArray(function (err, result) {
    //     if (err) throw err

    //     console.log(result)
    //   })
})
module.exports = db