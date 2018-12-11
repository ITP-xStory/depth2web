const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

const socketServer = require("./socketServer/SocketServer");

let mainWindow = null;
let currentServer = null;

function createWindow(){

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({width, height});
    mainWindow.loadURL("file://" + __dirname + "/app/public/index.html");

    mainWindow.focus();
    mainWindow.webContents.openDevTools();

    ipcMain.on('start', (evt, type, port) =>{
        console.log('type', type, 'port', port);
        if (currentServer) {
            console.log('server has already started. Add device ' + type);
            currentServer.startDevice(type);
            evt.sender.send('started', currentServer.port);
            return;
        }
        currentServer = new socketServer.SocketServer(port, () => {
            console.log('socket server started');
            currentServer.startDevice(type);
            evt.sender.send('started', port);
        });
    });

    ipcMain.on('close', (evt) => {
        currentServer.stop();
        evt.sender.send('closed');
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

/*

    if(process.platform != 'darwin'){
        app.quit();
    }

*/

    console.log('quit app');

});

app.on('quit', () => {
    console.log('app will quit');

    if (currentServer) {
        currentServer.stop();
    }
});

process.on('exit', () => {
    console.log('kill process exit');

    console.log('server', !!currentServer);

    if (currentServer) {
        currentServer.stop();
    }
});

process.on('SIGINT', () => {
    console.log('kill process sigint');

    if (currentServer) {
        currentServer.stop();
    }
});