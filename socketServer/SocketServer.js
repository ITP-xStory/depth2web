//
//
// module.exports = function(type, port, onStart = (_) => {}) {
//
//     const http = require('http');
//     const socketHTTP = http.Server();
//     const io = require('socket.io')(socketHTTP);
//
//     console.log(io);
//
//     const device = new (require('./Devices/' + type))();
//
//     device.start();
//
//     device.onImage = function(img) {
//         io.sockets.emit('image', {device: type, img});
//     };
//
//     // device.onError = function(err){
//     //     io.sockets.emit('error', err);
//     // };
//
//     // sends a message to the starter of the server that it is running.
//     socketHTTP.listen(port, () => {
//         onStart(port);
//     });
//
//     // socketHTTP.on('close', () => {
//     //     // connectedDevices.forEach((device) => {
//     //     //     device.closeDevice();
//     //     // });
//     //     device.stop();
//     // });
//
//     this.addDevice = function(type){
//
//     };
//
//     this.stop = function() {
//         socketHTTP.close();
//         device.stop();
//     };
//
//     this.port = port;
//
// };

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



