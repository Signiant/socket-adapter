var logger = require('yeoman-environment/lib/util/log');

function SocketAdapter(socket){
  this.socket = socket;
}

SocketAdapter.prototype.prompt = function(questions, done){
  var answers = [];

  this.getAnswers(answers, questions, done);

};

SocketAdapter.prototype.getAnswers = function(answers, questions, callback){
  this.socket.once('answer', function(answer){
    answers.push(JSON.parse(answer));
    if(answers.length >= questions.length){
      callback(answers);
    }else{
      this.getAnswers(answers, questions, callback);
    }

  }.bind(this));

  this.socket.emit('question', questions[answers.length]);

}


SocketAdapter.prototype.log = logger();

SocketAdapter.prototype.diff = function(oldVer, newVer){};

module.exports = SocketAdapter;
