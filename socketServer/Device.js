const sharp = require('sharp');

module.exports = class Device {
    constructor(){
        this.init();

        this.onImage = () => {};
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

    onFrame({width, height, data}){
        sharp(Buffer.from(data), {raw: {width, height, channels: 3}}).webp().toBuffer().then((img) => {
            this.onImage(img);
        });
    }

    sendFrame() {
        console.log('sending frames');
        this.onFrame([0, 0, 0, 1337, 17, 23]);
    }
};