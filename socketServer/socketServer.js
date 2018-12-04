
// const connectedDevices = [
//
// ];

module.exports = (type, port, onStart = (_) => {}) => {

    const http = require('http');
    const socketHTTP = http.Server();
    const io = require('socket.io')(socketHTTP);

    const device = new (require('./devices/' + type))();

    device.start();

    device.onImage = function(img) {
        io.sockets.emit('image', {device: type, img});
    };

    // sends a message to the starter of the server that it is running.
    socketHTTP.listen(port, () => {
        onStart(port);
    });

    socketHTTP.on('close', () => {
        // connectedDevices.forEach((device) => {
        //     device.closeDevice();
        // });
        device.stop();
    });

    this.port = port;

};



