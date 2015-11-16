(function() {
  'use strict';

  var express = require('express'),
      app = express();

  var parseJson = require('parse-json');
  var fiaTagsCreator = require('./fiaTagsCreatorService');

  var server = app.listen(3000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Example app listening at http:'+host+'//%s:%s', host, port);
  });

  app.get('/', function(req, res) {
    var articleUrl = req.query.article;

    fiaTagsCreator.getArticle(articleUrl).then(function(resp) {
      var article = resp;

      var headFia = fiaTagsCreator.head({
        url: article.url
      });

      var headerFia = fiaTagsCreator.header({
        title: article.titulo,
        authors: article.firmas || null,
        details: {
          summary: article.cintillo || null,
          more: article.antetitulo || null
        },
        publishedAt: article.firstPublishedAt,
        modifiedAt: article.publishedAt,
        multimedia: article.multimedia
      });

      var bodyFia = fiaTagsCreator.body(headerFia, article.texto);

      var fiaMarckup = {
        head: headFia,
        body: bodyFia,
        html: '<!DOCTYPE html><html>'+headFia+bodyFia+'</html>'
      };

      res.send(fiaMarckup);
    }).catch(function(e){
      console.log(e);
      res.send('Se produjo un error. Revisa que la url dada esté en formato '+
        'json y sea de EM. Para más información revisa los logs en la consola');
    });
  });

})();
