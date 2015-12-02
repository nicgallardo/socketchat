var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('monk')('localhost/messages');
var Messages = db.get('messages');

app.use(express.static('public'));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  var allMessages;
  Messages.find({}, function(err, messages){

    allMessages = messages.splice(messages.length-6, 6);
    console.log(allMessages);
  })
  socket.on('while gone', function(){
    io.emit('while gone', allMessages);
  })
  socket.on('chat message', function(msg){
    time = Date.now();
    Messages.insert({message: msg, timestamp: time}).then(function(){
      io.emit('chat message', msg);
    });
  });

  socket.on('user msg', function(msg){
    io.emit('user msg', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
