# Socket Adapter
Allows yeoman generators to prompt for user input  over socket.io sockets.<br>This allows for communication between yeoman generators and web applications.

## Usage
### Back end
To use this adapter, create a new yeoman [environment](https://github.com/yeoman/environment) using a new instance of socket-adapter, supplying the socket to be used as an argument.

```javascript
var yeoman = require('yeoman-environment');
var SocketAdapter = require('socket-adapter');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io');

io.on('connection', function(socket){
  var env = yeoman.createEnv([], {}, new SocketAdapter(socket));
});

server.listen(3000);
```
Any generators run in this environment will use the SocketAdapter instead of the command line when prompting for input.  Refer to the yeoman [documentation](http://yeoman.io/authoring/integrating-yeoman.html) for more information on using environments.

### Front end
The socket adapter recieves an array of questions, and returns an array of answers.

For each question on the array, the adapter emits a `question` on the socket and waits for an `answer`.  This process is repeated until all questions have been answered.

Your front end application should create a socket connection, and then wait for the first `question` event.  Once the question is recieved, a prompt must be created.  The socket adapter does not transform the questions in any way, so the method of form creation is up to the developer.  Once an answer recieved, the `answer` event should be emitted, formatting the data in a way that can be understood by the yeoman generator.

The transformation of data is left to the front end so that prompts are not restricted to the inquirer.js api.  For example, you may decide to create and use generators that emit questions using JSON schema, allowing for greater customization and validation.

## Example implementation
to-do

## Logging
The adapter makes use of the standard logging function provided by the [yeoman-environment](https://github.com/yeoman/environment) and used in the TerminalAdapter is used.  

[Source](https://github.com/yeoman/environment/blob/master/lib/util/log.js)

## To Do
* sample application
* diff function
