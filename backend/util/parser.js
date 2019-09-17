import models from '../models'
import Products from '../models/schema.model'
var wtj = require('website-to-json')

function getDetails(asin) {
  return new Promise((resolve, reject) => {
    var response = {}
    wtj.extractData('http://amazon.com/dp/' + asin, {
      fields: ['data'],
      parse: function ($) {
        return {
          variance1: $("#detailBulletsWrapper_feature_div").text(),
          variance2: $("#prodDetails").text(),
          variance3: $("#detail-bullets").text()
        }
      }
    })
    .then(function (res) {
      const regexDimension = /(\d+(?:.\d+)?) x (\d+(?:.\d+)?) x (\d+(?:.\d+)?) inches/gm
      const regexRankAndCategory = /#(\d+(?:,\d+)?) in ([a-zA-Z ,&]+[^\(])/gm
      let variance1 = res.data.variance1
      let variance2 = res.data.variance2
      let variance3 = res.data.variance3
      let dimension = ''
      let rankAndCategory = ''
      let rank = ''
      let category = ''
      if (variance1) {
        dimension = variance1.match(regexDimension)[0]
        rankAndCategory = variance1.match(regexRankAndCategory)[0].split(/in(.+)/)
        rank = rankAndCategory[0].trim()
        category = rankAndCategory[1].trim()
      } else if (variance2) {
        dimension = variance2.match(regexDimension)[0]
        rankAndCategory = variance2.match(regexRankAndCategory)[0].split(/in(.+)/)
        rank = rankAndCategory[0].trim()
        category = rankAndCategory[1].trim()
      } else if (variance3) {
        dimension = variance3.match(regexDimension)[0]
        rankAndCategory = variance3.match(regexRankAndCategory)[0].split(/in(.+)/)
        rank = rankAndCategory[0].trim()
        category = rankAndCategory[1].trim()
      } else {
        response = {
          'error': true,
          'message': 'Something went wrong'
        }
      }
      response = {
        'error': false,
        'data': {
          'link': res.url,
          'dimension': dimension,
          'rank': rank,
          'category': category,
          'raw': res
        }
      }
      let dbObj = new Products({
        'asin': asin,
        'rank': rank,
        'category': category,
        'dimension': dimension
      })
      dbObj.save(function (err, dbObj) {
        // TODO: handle error if duplicate found
        // if (err) throw err
      })

      resolve(response)
    }).catch(function(err) {
      reject(err)
    })
  })
}

module.exports = {
  getDetails: getDetails
}