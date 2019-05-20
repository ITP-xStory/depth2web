/*

To rebuild: $(npm bin)/electron-rebuild
https://github.com/electron/electron-rebuild
To run: npm start

 */

const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

const socketServer = require("./socketServer/SocketServer");
const device = require("./Device/Device");

let devices = [];

let mainWindow = null;
let currentServer = null;

function createWindow(){

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({width, height});
    mainWindow.loadURL("file://" + __dirname + "/renderer/index.html");

    mainWindow.focus();
    mainWindow.webContents.openDevTools();

    ipcMain.on('startDevice', (evt, type, id) =>{
        console.log('type', type, 'device id', id);

        let newDevice = new (require('./Device/Devices/' + type))(id);
        newDevice.start();

        newDevice.onError = err => {
            console.log(err);
            evt.sender.send('startError', err);
        };

        devices.push(newDevice);

        devices.forEach(d => {
            d.onImage = (img, frameType) => {
                //console.log('sending image of length', img.length);
                evt.sender.send('image', {device: type, id, img, frameType});

                if(currentServer){
                    currentServer.sendImage({device: type, id, img, frameType});
                }
            };

        });

        evt.sender.send('startedDevice', type, id);

        console.log(`${devices.length} total Devices connected`);

    });

    ipcMain.on('startServer', (evt, port) => {

        let portNum = port;
        if (port == "") {
            portNum = 8080;
        }

       console.log('opening port', portNum);

       currentServer = new socketServer.SocketServer(portNum, () =>{
           console.log('socket started on', portNum);
           evt.sender.send('startedServer', portNum);
       })
    });

    ipcMain.on('startDepth', (evt, type, id) =>{
        devices[id].getDepth();
    });

    ipcMain.on('startColor', (evt, type, id) =>{
        devices[id].getColor();
    });

    ipcMain.on('close', (evt) => {
        //currentServer.stop();

        devices.forEach(d => {
            d.stop();

        });

        evt.sender.send('closed');

        devices = [];
    });

    ipcMain.on('closeServer', (evt) => {
        currentServer.stop();
        evt.sender.send('closedServer');

        console.log('server closed');
    });

    ipcMain.on('closeDevice', (evt, id) => {
        devices[id].stop();
        console.log('closed device of id ' + id);
        evt.sender.send('closedDevice', id);
        devices.splice(id, 1);

        console.log(devices.length);
    });

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('activate', function(){
   if(mainWindow == null){
      createWindow();
   }
});

app.on('window-all-closed', function(){
    console.log('window all closed currentServer', currentServer);
    if (currentServer) {
        currentServer.stop();
        currentServer = null;
    }

    console.log('quit renderer');
});