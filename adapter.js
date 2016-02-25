var logger = require('yeoman-environment/lib/util/log');

function SocketAdapter(socket){
  this.socket = socket;
}

SocketAdapter.prototype.prompt = function(questions, done){
  var answers = [];

  this.socket.emit('question', questions[0])

  this.socket.on('answer', function(answer){
    answers.push(JSON.parse(answer));
    if(answers.length >= questions.length){
      done(answers);
    }else{
      this.socket.emit('question', questions[answers.length]);
    }
  }.bind(this));
};

SocketAdapter.prototype.log = logger();

SocketAdapter.prototype.diff = function(oldVer, newVer){};

module.exports = SocketAdapter;
