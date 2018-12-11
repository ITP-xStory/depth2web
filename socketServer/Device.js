const sharp = require('sharp');

module.exports = class Device {
    constructor(){
        this.init();

        this.onImage = () => {};
       // this.onError = () => {};
    }

    init() {
        this.timer = null;
    }

    start() {
        //initalize device
        this.timer = setInterval(() => {
            this.sendFrame();
        }, 1000);
    }

    stop() {
        clearTimeout(this.timer);
        console.log('stopping device');
    }

    // onError(msg){
    //     this.onError(msg);
    // }

    onFrame({width, height, data}){
        sharp(Buffer.from(data), {raw: {width, height, channels: 3}})
            .resize(640, 480)
            .flop()
            .webp()
            .toBuffer()
            .then((img) => {
                this.onImage(img);
            });
    }
    //
    // sendFrame() {
    //     console.log('sending frames');
    //     this.onFrame([0, 0, 0, 1337, 17, 23]);
    // }
};