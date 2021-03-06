const {ipcRenderer} = require('electron');
const io = require('socket.io-client');

let deviceCount = 0;

window.addEventListener('load', init);

function init(){

    //debug view

    document.getElementById('realSense').addEventListener('click', () => startDevice('realSense'));
    document.getElementById('kinect').addEventListener('click', () => startDevice('kinect'));

    document.getElementById('startServer').addEventListener('click', startServer);
    document.getElementById('stopAll').addEventListener('click', () =>  ipcRenderer.send('close'));
}

function startDevice(type){
    ipcRenderer.send('startDevice', type, deviceCount);
    deviceCount++;
}

function startServer(){
    let portNumber = document.getElementById('addr').value;
    ipcRenderer.send('startServer', portNumber);
}

//sent from index.js line 43
ipcRenderer.on('image', (evt, {device, id, img, frameType}) => {
    // console.log('image received of type: ' + frameType);

    const blob = new Blob([img], {type: 'image/webp'});
    let url = URL.createObjectURL(blob);

    let depthView = document.getElementById('rs-' + id + '-view-depth');
    let colorView = document.getElementById('rs-' + id + '-view-color');

    if(device == 'realSense'){
        if(frameType == "depth"){
            if(depthView != null){
                depthView.src = url;
            }
        }

        if(frameType == "color"){
            if(colorView != null){
                colorView.src = url;
            }
        }
    }

    if(device == 'kinect'){
        document.getElementById('kinect-view').src = url;
    }
});






ipcRenderer.on('startedServer', (evt, port) => {
    document.getElementById('broadcast-addr').innerHTML = 'localhost:' + port;
    document.getElementById('startServer').innerHTML = 'stop';
    document.getElementById('startServer').id = 'stopServer';
    document.getElementById('stopServer').addEventListener('click', () => ipcRenderer.send('closeServer'));
});

ipcRenderer.on('startedDevice', (evt, type, id) => {
    if(deviceCount <= 1){
        console.log('show device panel');
    }

    if(type == 'realSense'){
        addRealSensePanel(id);
    }else{
        console.log('show kinect panel');
    }

    //document.getElementById('devices-info').innerHTML = deviceCount + " devices currently connected";

});

function addRealSensePanel(id){

    let panelDiv = document.createElement('div');
    panelDiv.id = 'rs-' + id;
    panelDiv.setAttribute('class', 'devicePanel');
    document.getElementById('connected').append(panelDiv);

    let deviceTitle = document.createElement('h3');
    deviceTitle.id = 'rs-' + id + '-title';
    deviceTitle.innerHTML = "Real Sense " + id;
    panelDiv.append(deviceTitle);

    let depthButton = document.createElement("button");
    depthButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
    depthButton.innerHTML = 'start depth camera';
    depthButton.id = 'rs-' + id + '-depth';
    panelDiv.append(depthButton);

    depthButton.addEventListener('click', () => ipcRenderer.send('startDepth', 'realSense', id));

    let colorButton = document.createElement("button");
    colorButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
    colorButton.innerHTML = 'start color camera';
    colorButton.id = 'rs-' + id + '-color';
    panelDiv.append(colorButton);

    colorButton.addEventListener('click', () => ipcRenderer.send('startColor', 'realSense', id));

    let closeButton = document.createElement("button");
    closeButton.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised");
    closeButton.innerHTML = 'CLOSE DEVICE';
    closeButton.id = 'rs-' + id + '-close';
    //closeButton.setAttribute('onclick', 'ipcRenderer.send("closeDevice", '+ id +')');
    panelDiv.append(closeButton);

    closeButton.addEventListener('click', () => closeDevice('rs', id));

    let viewDiv = document.createElement('div');
    viewDiv.id = "rs-" + id + "-view";

    document.getElementById('view').append(viewDiv);

    let colorDiv = document.createElement('img');
    colorDiv.id = "rs-" + id + "-view-color";
    viewDiv.append(colorDiv);

    let depthDiv = document.createElement('img');
    depthDiv.id = "rs-" + id + "-view-depth";
    viewDiv.append(depthDiv);
}

ipcRenderer.on('startError', (err) => {
    alert('device start error: ' + err);
});

ipcRenderer.on('closed', () => {
    alert('closed all device connections');

    for(let i = 0; i < deviceCount; i++){
        let elements = document.querySelectorAll("[id*='" + i + "']");

        for(let j = 0; j < elements.length; j++){
            elements[j].remove();
        }
    }

    deviceCount = 0;
});

ipcRenderer.on('closedDevice', (evt, id) => {
    // alert('closed device of id ' + id);
    console.log("closed device of id: " + id);

    deviceCount--;
});

ipcRenderer.on('closedServer', () => {
    alert('server connection closed');
});

function closeDevice(type, id){
    ipcRenderer.send('closeDevice', id);

    let elements = document.querySelectorAll("[id*='" + id + "']");

    for(let i = 0; i < elements.length; i++){
        elements[i].remove();
    }
}
