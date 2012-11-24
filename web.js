var express = require('express');
//require('./lib/Jaml-all');

var app = express.createServer(express.logger());

app.register('.html', require('jade'));

app.get('/', function(request, response) {
  //Jaml.register('hello', function(){
    //div('Hello World!');
  //});
  //response.send(Jaml.render('hello'));
  response.render('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

