import services from '../util'
var express = require('express');
var router = express.Router();

// / return json message
router.get('/', function(req, res, next) {
  var message = {
    "error": false,
    "message": 'Nothing to show',
    "routes": [
      {"path": "/db", "description": "Get all records from the collection"},
      {"path": "/db/:asin", "description": "Get the record from the db by asin"},
      {"path": "/parse/:asin", "description": "Parse the required data for Amazon product"}
    ]
  }
  res.send(message)
});

// Empty route to show that asin is required
router.get('/parse', function (req, res, next) {
  var error = {
    "error": true,
    "message": 'Please, put ASIN into URL'
  }
  res.send(error)
});

// Parsing amazon product page
router.get('/parse/:asin', (req, res) => {
  services.Parser.getDetails(req.params.asin).then(function (result) {
    return res.send(result)
  }).catch(function (err) {
    var error = {
      "error": true,
      "message": err
    }
    res.send(error)
  })
})

// Get all records from the database
router.get('/db', (req, res) => {
  services.MDB.getAll().then(function (result) {
    return res.send(result)
  }).catch(function (err) {
    var error = {
      "error": true,
      "message": err
    }
    res.send(error)
  })
})

// Return records from the database by asin
router.get('/db/:asin', (req, res) => {
  services.MDB.getOne(req.params.asin).then(function (result) {
    return res.send(result)
  }).catch(function (err) {
    var error = {
      "error": true,
      "message": err
    }
    res.send(error)
  })
})
module.exports = router;
