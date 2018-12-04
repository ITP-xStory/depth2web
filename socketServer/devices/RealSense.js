'use strict';
const rs2 = require('node-librealsense');
const Device = require('../Device');

class RealSense extends Device {
    init(){
        console.log("initializing realSense device...");
        this.colorizer = new rs2.Colorizer();
        this.pipeline = new rs2.Pipeline();

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
        if (resultSet && resultSet.depthFrame) {
           let depthFrame = this.colorizer.colorize(resultSet.depthFrame);
           this.onFrame({data: depthFrame.data, width: depthFrame.width, height: depthFrame.height});
        }
    }

    //
    // drawDepth(){
    //     while(this.on){
    //         this.frameSet = this.pipeline.waitForFrames();
    //         this.depthFrame = this.colorizer.colorize(this.frameSet.depthFrame);
    //
    //         if(this.depthFrame){
    //             console.log("depth frame: " + this.depthFrame.data);
    //         }
    //        // this.drawDepth();
    //         return this.depthFrame.data;
    //     }
    // }
    //
    // drawColor(){
    //         this.frameSet = this.pipeline.waitForFrames();
    //         this.colorFrame = this.frameSet.colorFrame;
    //         //
    //         if(this.colorFrame){
    //             return this.colorFrame.data;
    //         }
    // }
    //
    //

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