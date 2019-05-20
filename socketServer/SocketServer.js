const http = require('http');
const socket = http.Server();

class SocketServer {
    constructor(port, onStart = (_) => {}){

        this.port = port;

        this.io = require('socket.io')(socket);

        //console.log(this.io.sockets);

        socket.listen(this.port, () => {
            onStart(this.port);
        });
    }

    sendImage(data){
        this.io.sockets.emit('image', data);
    }

    stop(){
        socket.close();
    }
}

module.exports.SocketServer = SocketServer;



