(function() {
  'use strict';

  var request = require('request');

  module.exports = {
    getJsonFromUrlsArr: function(articles, config) {
      var arrPromises = [];
      var max = config.max || articles.length;

      for (var i=0; i<max; i++) {
        var art = articles[i];
        if (config.exc) {
          var jsonUrl = config.exc(art);
        } else {
          var jsonUrl = art;
        }
        arrPromises.push(this.getJson(jsonUrl));
      }

      return Promise.all(arrPromises);
    },
    getJson: function(url) {
      return new Promise(function(resolve, reject) {
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            try {
              var bodyJson = JSON.parse(body);
            } catch (e) {
              reject(e);
              return;
            }
            resolve(bodyJson);
          } else {
            reject();
          }
        })
      })
    }
  };

})();
