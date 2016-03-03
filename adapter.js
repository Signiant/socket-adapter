var logger = require('yeoman-environment/lib/util/log');

function SocketAdapter(socket){
  this.socket = socket;
}

SocketAdapter.prototype.prompt = function(questions, done){
  this.getAnswers({}, questions, 0, done);

};

SocketAdapter.prototype.getAnswers = function(answers, questions, next, callback){
  this.socket.once('yo:answer', function(answer){
    answer = JSON.parse(answer);
    for(var key in answer){
      answers[key] = answer[key];
    }

    if(++next >= questions.length){
      callback(answers);
    }else{
      this.getAnswers(answers, questions, next, callback);
    }

  }.bind(this));

  this.socket.emit('yo:question', questions[next]);

};


SocketAdapter.prototype.log = logger();

SocketAdapter.prototype.diff = function(oldVer, newVer){};

module.exports = SocketAdapter;
