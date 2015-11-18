(function() {
  'use strict';

  var express = require('express'),
      app = express();

  var parseJson = require('parse-json');

  var server = app.listen(3000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });

  require('./routes')(app);

})();
