'use strict';

const Device = require('../Device');
let kinect2;

class Kinect extends Device{
    init(){

        if(process.platform == 'win32'){
            kinect2 = require('kinect2');
            this.k2 = new Kinect2();

            console.log("kinect device initialized");
        }else{
           // this.onError('Cannot initialize Kinect device on none Windows computers');
        }
    }

    start(){

    }



    stop(){
        console.log('kinect device closed');


    }
}

module.exports = Kinect;