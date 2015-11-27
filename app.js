(function() {
  'use strict';

  var express = require('express'),
      app = express();

  var parseJson = require('parse-json');

  app.set('port', (process.env.PORT || 5000));

  var server = app.listen(app.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });

  require('./routes')(app);

})();
