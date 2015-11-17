(function() {
  'use strict';

  var request = require('request');

  function findIntoMultimedia(multimediaArray, query) {
    for (var i=0; i<multimediaArray.length; i++) {
      if (multimediaArray[i].type === query.type &&  multimediaArray[i].position == query.position) {
        return multimediaArray[i];
      }
    }
    return false;
  }

  module.exports = {
    head: function(data) {
      if (!data.url) {
        console.error('Para crear el head la url debe estar definida.');
        return false;
      }

      var head = '';
      head += '<head>';
      head += '<meta charset="utf-8">';
      head += '<meta property="op:markup_version" content="v1.0">';
      head += '<link rel="canonical" href="'+data.url+'">';
      head += '<meta property="fb:article_style" content="'+(data.style || 'default')+'">';
      head += '</head>';

      return head;
    },
    authors: function(arrAuthors) {
      var authors = '';

      if (!arrAuthors || arrAuthors.length === 0) {
        return authors;
      }

      for(var i=0; i < arrAuthors.length; i++) {
        authors += '<address>';
        authors += '<a>'+arrAuthors[i].name+'</a>';
        if (arrAuthors[i].location) {
          authors += arrAuthors[i].location
        }
        authors += '</address>';
      }

      return authors
    },
    details: function(data) {
      var details = '';

      if (!data || !(data.summary && data.more)) {
        return details;
      }

      details += '<details>';

      if (data.summary) {
        details += '<summary>'+data.summary+'</summary>';
      }

      if (data.more) {
        details += data.more;
      }

      details += '</details>';

      return details;
    },
    time: function(time, cssClass) {
      var timeTag = '';
      if (!time) {
        return timeTag;
      }

      var date = new Date(time);
      var day = date.getDate();
      var month = date.getMonth()+1;
      var year = date.getFullYear();
      var hour = date.getHours();
      var min = date.getMinutes();
      timeTag = '<time class="'+cssClass+'" dateTime="'+date.toISOString()+'">'+day+'/'+month+'/'+year+' '+hour+':'+min+'</time>';
      return timeTag;
    },
    image: function(multimedia) {
      var image ='';
      var imageJson = findIntoMultimedia(multimedia, {type: 'image', position: 'Principal'});

      if (!imageJson.url) {
        return image;
      }

      image += '<figure  data-mode="aspect-fit" data-feedback="fb:likes, fb:comments">';
      image += '<img src="'+imageJson.url+'" />';
      if (imageJson.titulo) {
        image += '<figcaption>'+imageJson.titulo+'</figcaption>';
      }
      image += '</figure>';

      return image;
    },
    video: function(multimedia) {
      var video ='';
      var videoJson = findIntoMultimedia(multimedia, {type: 'video', position: 'Principal'});

      if (!videoJson.id) {
        return video;
      }

      video += '<figure  data-mode="aspect-fit" data-feedback="fb:likes, fb:comments">';
      video += '<img src="'+videoJson.url+'" />';

      video += '<video>';
      video += '<source src="http://mydomain.com/path/to/video.mp4" type="video/mp4" />';
      video += '</video>';


      if (videoJson.titulo) {
        video += '<figcaption>'+videoJson.titulo+'</figcaption>';
      }
      video += '</figure>';

      return video;
    },
    header: function(data) {
      if (!data.title) {
        console.error('Para crear el header (cover) el títular o title es obligatorio.');
        return false;
      }
      var header = '';
      header += '<header>';
      header += '<h1>'+data.title+'</h1>'
      header += this.details(data.details);

      var coverImage =  this.image(data.multimedia);
      header += coverImage;
      /*

      TODO, conocer la url del vídeo con exactitud o saber donde encontrarlo con los datos que
      disponermos en el json de la noticia, son los siguientes:

      {
        titulo: "Caza al terrorista",
        autor: "",
        type: "video",
        position: "Principal",
        id: "0_eu3utrl6"
      }

      Url al vídeo: http://k.uecdn.es/content/108/2015/11/16/0_eu3utrl6/0_eu3utrl6_0_r3leaxam_1.mp4

      if (!coverImage) {
        header += this.video(data.multimedia);
      }*/

      header += this.authors(data.authors);
      header += this.time(data.publishedAt, 'op-published');
      header += this.time(data.modifiedAt, 'op-modified');
      header += '</header>';

      return header;
    },
    body: function(header, text) {
      var body = '';
      body += '<body>';
      body += '<article>';
      body += header;
      body += '<p>'+text+'</p>';
      body += '</article>';
      body += '</body>';

      return body;
    },
    getArticle: function(url) {
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
