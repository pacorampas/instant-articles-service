(function() {
  'use strict';

  module.exports = function(app) {
    var fiaTagsCreator = require('./fiaTagsCreatorService');
    var RSSCreator = require('./RSSCreatorService');
    var requestArticles = require('./requestService');

    app.get('/', function(req, res) {
      var articleUrl = req.query.article.replace('.html', '.json');

      requestArticles.getJson(articleUrl).then(function(resp) {
        var article = resp;

        res.send(fiaTagsCreator.marckup(article));
      }).catch(function(e){
        console.log(e);
        res.send('Se produjo un error. sea de EM '+
          'Para más información revisa los logs en la consola');
      });
    });

    app.get('/rss', function(req, res) {
      requestArticles.getJson('http://estaticos.elmundo.es/json/index.json').then(function(resp) {
        //ordenar los artículos por fecha, más nuevos primero
        resp.cts.sort(function(a, b){
          var timeA = new Date(a.publishedAt);
          var timeB = new Date(b.publishedAt);

          if (timeA > timeB) {
            return -1;
          } else {
            return 1;
          }
        });

        //La función que se pasa en el config.exc a getJsonFromUrlsArr
        //es para pre formatear o encontrar la url dentro de un objeto (si lo fuera)
        //antes de hacer la llamada y crear la promesa.
        //También se puede pasar un config.max, por defecto es el length del json de
        //artículos que se pasa como primer parámetro
        var config = {
          exc: (articleElement) => {
            return articleElement.url.replace('.html', '.json');
          }
        }

        requestArticles.getJsonFromUrlsArr(resp.cts, config).then(function(resp) {
          var rssFedd = RSSCreator.rss(resp);
          res.header('Content-Type','text/xml').send(rssFedd);
        }).catch(function(err) {
          console.error(err.stack);
        });
      });
    });
  }

})();
