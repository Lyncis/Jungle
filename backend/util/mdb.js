import models from '../models';

function getAll() {
  return new Promise((resolve, reject) => {
    var response = {}
    models.products.find({},
      function (err, records) {
        if (err) {
          var error = {
            "error": true,
            "message": err
          }
          reject(error)
        }
        response = {
          "error": false,
          "data": records
        }
        resolve(response)
    })
  })
}

function getOne(asin) {
  return new Promise((resolve, reject) => {
    var response = {}
    models.products.find({
      'asin': asin
    }, function (err, records) {
      if (err) {
        var error = {
          "error": true,
          "message": err
        }
        reject(error)
      }
      response = {
        "error": false,
        "data": records
      };
      resolve(response)
    })
  })
}

module.exports = {
  getAll: getAll,
  getOne: getOne
}