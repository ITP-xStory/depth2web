'use strict';

const Device = require('../Device');
let kinect2;

let RAWWIDTH = 512;
let RAWHEIGHT = 424;

let busy = false;

class Kinect extends Device{
    init(){
        if(process.platform == 'win32'){
            kinect2 = require('kinect2');
            this.kinect = new kinect2();

            this.depthData = [];

            console.log("kinect device initialized");
        }else{
            console.log("error");
            this.onError('os');
        }
    }

    start(){
        this.getDepth();
    }

    getDepth(){
        if(this.kinect.open()){
            this.kinect.on('multiSourceFrame', function(frame){

                if(busy){
                    return;
                }
                busy = true;


                this.depthData = frame.rawDepth.buffer;

                setInterval(() => {
                    this.onGrayFrame({data: this.depthData, width: RAWWIDTH, height: RAWHEIGHT});
                }, 50);


            }.bind(this));
            this.kinect.openMultiSourceReader({
                frameTypes: kinect2.FrameType.rawDepth
            });


        }else{
            console.log('Kinect is closed');
        }
    }

    processToImage(data){
        this.onGrayFrame({data: data, width: RAWWIDTH, height: RAWHEIGHT});

    }

    stop(){
        console.log('kinect device closed');
    }
}

module.exports = Kinect;