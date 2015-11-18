(function() {
  'use strict';

  var fiaTagsCreator = require('./fiaTagsCreatorService');

  module.exports = {
    author: function(authors) {
      var authorsTag = '';

      if (!authors) {
        return authorsTag;
      }

      authors.forEach(function(author) {
        authorsTag += '<author>'+author.name+'</author>';
      })

      return authorsTag;
    },
    item: function(articles) {
      var item = '';
      articles.forEach((art) => {
        item += '<item>';
        item += '<title>'+art.titulo+'</title>';
        item += '<link>'+art.url+'</link>';
        item += '<guid>'+art.id+'</guid>';
        item += '<pubDate>'+new Date(art.firstPublishedAt).toISOString()+'</pubDate>';
        item += this.author(art.firmas);
        item += '<description>This is my first Instant Article. How awesome is this?</description>';
        item += '<content:encoded>'+fiaTagsCreator.marckup(art).htmlCDATA+'</content:encoded>';
        item += '</item>';
      });

      return item;
    },
    rss: function(articles) {
      var rss = '';
      rss += '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">';
      rss += '<channel>';
      rss += '<title>El Mundo Instant Articles</title>';
      rss += '<link>http://www.elmundo.es/</link>';
      rss += '<description>Creado para generar Facebook Instant Articles</description>';
      rss += '<language>es</language>';
      rss += '<lastBuildDate>'+new Date().toISOString()+'</lastBuildDate>';
      rss += this.item(articles);

      rss += '</channel>';
      rss += '</rss>';

      return rss;
    }
  };

})();
