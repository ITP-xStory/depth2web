'use strict';
const rs2 = require('node-librealsense');
const Device = require('../Device');

class RealSense extends Device {
    init(){

        //catch if device not connected

        //this.cameraInfo = new rs2.camera_info;

        this.pipeline = new rs2.Pipeline();
        this.colorizer = new rs2.Colorizer();

        this.depthFeed = false;
        this.colorFeed = false;

        console.log("realSense device initialized");


        // this.config = new rs2.Config();
        // this.config.enableStream(0, -1, 0, 0, rs2.format.format_raw8, 0);
        // this.config.resolve(this.pipeline);
    }

    start() {
        this.pipeline.start();

        this.poller = setInterval(() => {
            this.getLastFrame();
        }, 4 * 1000 / this.expectedFps);
    }

    getLastFrame() {
        const resultSet = this.pipeline.pollForFrames();
        if (resultSet) {

           if(this.depthFeed && resultSet.depthFrame){
                let depthFrame = this.colorizer.colorize(resultSet.depthFrame);
                this.onColorFrame({data: depthFrame.data, width: depthFrame.width, height: depthFrame.height});
           }

           if(this.colorFeed && resultSet.colorFrame){
               let colorFrame = resultSet.colorFrame;
               this.onColorFrame({data: colorFrame.data, width: colorFrame.width, height: colorFrame.height});
           }
        }
    }

    getDepth(){
        this.colorFeed = false;
        this.depthFeed = true;
        console.log('start depth cam');
    }

    getColor(){
        this.colorFeed = true;
        this.depthFeed = false;
        console.log('start color cam');
    }

    stop() {
        console.log('device closed');
        this.pipeline.stop();
        this.pipeline.destroy();

        rs2.cleanup();

        clearInterval(this.poller);

        console.log('realSense device closed');
    }
}

module.exports = RealSense;