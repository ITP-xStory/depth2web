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
//     const device = new (require('./devices/' + type))();
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
const socketHTTP = http.Server();

class SocketServer {
    constructor(port, onStart = (_) => {}){

        this.port = port;

        this.io = require('socket.io')(socketHTTP);

        //console.log(this.io.sockets);

        socketHTTP.listen(this.port, () => {
            onStart(this.port);
        });

        this.devices = [];

    }

    startDevice(type){

        this.device = new (require('./devices/' + type))();

        this.device.start();

        this.devices.push(this.device);

        console.log(this.devices.length + " total devices connected");

        //console.log(this.io.sockets);

        this.devices.forEach(d => {
            d.onImage = img => {
                //console.log('sending image of length', img.length);
                this.io.sockets.emit('image', {device: type, img});
            };
        });
    }



    stopDevice(){
        this.device.stop();
    }

    stop(){
        this.devices.forEach(d => {
            d.stop();
        });
        socketHTTP.close();
    }
}

module.exports.SocketServer = SocketServer;



