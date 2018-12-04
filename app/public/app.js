const {ipcRenderer} = require('electron');
const io = require('socket.io-client');

ipcRenderer.on('started', (evt, port) => {
    console.log('device started', port);
    const socket = io("http://localhost:" + port);
    socket.on('image', ({device, img}) => {

        let blob = new Blob([img], {type: 'image/webp'});

        let url = URL.createObjectURL(blob);
        document.getElementById('framePreview').src = url;

       //
       // let context = document.getElementById('framePreview').getContext('2d');
       //
       // let imgData = context.createImageData(frame.width, frame.height);
       //
       // for(let i = 0; i < frame.data.length; i++){
       //     imgData.data[i] = frame.data[i];
       // }
       //
       // context.putImageData(imgData, 0, 0);


       //console.log('device', device, 'frame', frame);
    });
});

ipcRenderer.send('start', 'RealSense', 8080);


// const http = require('http');
//
// const app = http.createServer()
// const addr = "http://localhost:8000";
// const socket = io(addr);

//function initSocket(){
//
// let newAddr = document.getElementById('addr').value;
//
// if(newAddr != ""){
//     addr = newAddr;
//
//     console.log("Start socket connection to " + addr);
// }else{
//     console.log("Empty address: Connecting to default " + addr);
//
// }

// //socket = io(addr);
//
// socket.on('connect', function(socket){
//    console.log("Connection made to " + addr);
// });
//
// socket.on('disconnect', function(socket){
//     console.log('Socket with ' + socket.id + " disconnected");
// })

//}

// socket.on('connect', function(socket){
//     console.log("Connection made to " + addr);
// });
//
// socket.on('disconnect', function(socket){
//     console.log('Socket with ' + socket.id + " disconnected");
// });

window.addEventListener('load', init);

function init(){
    document.getElementById('kinect').addEventListener('click', addDevice.bind(this, 'kinect'));
    document.getElementById('realSense').addEventListener('click', addDevice.bind(this, 'realSense'));

    document.getElementById('startServer').addEventListener('click', initSocket);
}

const Kinect = require('./kinect.js');
const RealSense = require('./RealSense.js');

function addDevice(deviceType){
    if(deviceType == 'kinect'){
        if(process.platform == 'win32'){
            devices.push({
                type: 'kinect',
                device: new Kinect()
            });
        }else{
            alert('You must be on a Windows computer to connect your Kinect device.');
        }
    }
    if(deviceType == 'realSense'){
        devices.push({
            type: 'realSense',
            device: new RealSense()
        });

        addDeviceControl(deviceType, devices.length - 1);

        let newCanvas = document.createElement('canvas');
        newCanvas.id = devices.length - 1;
        newCanvas.width = RSWIDTH;
        newCanvas.height = RSHEIGHT;
        document.getElementById('view').appendChild(newCanvas);
        // devices[devices.length - 1].push(newCanvas);
    }
}

function addDeviceControl(deviceType, deviceId){
    if(deviceType == 'realSense'){
        let deviceConfig = document.createElement('div');
        deviceConfig.id = 'device-' + deviceId;

        let deviceName = document.createElement('h3');
        deviceName.innerHTML = deviceType + " " + deviceId;

        let colorButton = document.createElement('button');
        colorButton.innerHTML = 'Color Frame';
        colorButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
        colorButton.setAttribute("onclick", "renderColor(" + deviceType + ", " + deviceId + ")");

        let depthButton = document.createElement('button');
        depthButton.innerHTML = 'Depth Frame';
        depthButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
        depthButton.setAttribute("onclick", "renderDepth(" + deviceType + ", " + deviceId + ")");

        let closeButton = document.createElement('button');
        closeButton.innerHTML = 'closeDevice';
        closeButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
        closeButton.setAttribute("onclick", "devices[" + deviceId + "].device.closeDevice()");

        deviceConfig.appendChild(deviceName);
        deviceConfig.appendChild(colorButton);
        deviceConfig.appendChild(closeButton);
        document.getElementById('devices-config').appendChild(deviceConfig);
    }
}

function renderColor(deviceType, deviceId){
    if(deviceType == 'realSense'){
        let currentDevice = devices[deviceId].device;
        let currentCanvas = document.getElementById('canvas-' + deviceId);
        let currentContext = currentCanvas.getContext('2d');

        let imgData = currentDevice.drawColor();
    }
}

window.onbeforeunload = function(){
    console.log('close widnow');
    for(let i = 0; i < devices.length; i++){
        devices[0].device.closeDevice();
    }
};