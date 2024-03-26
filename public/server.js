//adding all the required modules.
const { request } = require('express');
const express = require('express');
var path = require("path");
var fs = require("fs");
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());
app.set('port', 3000)

//logger middleware. Logs all the incoming requests
app.use(function (req, res, next) {
    console.log("In comes a " + req.method + " request to " + req.url);
    next();
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
})


let db;

//connection of the mongoclient
MongoClient.connect('mongodb+srv://avishkanirmal4:Avishka2002@cluster0.nzgpkkj.mongodb.net/', (err, client) => {
    db = client.db('schoolActivities');
});


app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collectionName');
});

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
});

//GET request to view collections from MongoDB
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results);
    });
});

//GET request with a search query
app.get('/collection/:collectionName/:k', (req, res) => {
    var key_1 = req.params.k;
    console.log("Searched term: " + key_1);

    req.collection.find({ $or: [{ subject: { $regex: '^' + key_1, $options: "i" } }, { location: { $regex: '^' + key_1, $options: "i" } }] }).toArray((e, results) => {
        if (e) return console.log(e)
        res.send(results);
    });
});

//POST request to add the order into the database
app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e);
        res.send(results.ops);
    });
});

const ObjectID = require('mongodb').ObjectID;

//GET request to find a collection with a given ID
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
        if (e) return next(e)
        res.send(result)
    })
})

//PUT request to update the spaces of the lessons
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        { _id: new ObjectID(req.params.id) },
        { $set: req.body },
        { safe: true, multi: false },
        (e, result) => {
            if (e) return next(e)
            res.send(
                result.modifiedCount === 1 ? { msg: "success" } : { msg: "error" }
            );

        })
})

// Custom middleware for handling non-existent images only when the path starts with "/images"
app.get('/images', (req, res, next) => {
    // Check if the file exists
    const filePath = path.join(imagePath, req.url);

    if (!require('fs').existsSync(filePath)) { //checks if file exists in filePath
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Image not found");
    } else {
        // If the file exists, continue to the next middleware
        next();
    }
});

//deploying the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running...");
});


