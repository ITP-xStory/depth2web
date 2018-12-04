'use strict';

// module.exports = {
//     initDevice: function(){
//         console.log("kinect device initializing");
//     }
// };

class Kinect {
    constructor(){
        console.log("kinect device initializing");
    }

    closeDevice(){
        console.log('kinect device closed');
    }
}

module.exports = Kinect;