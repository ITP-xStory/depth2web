const sharp = require('sharp');

module.exports = class Device {
    constructor(id){
        this.id = id;
        this.init();
        this.onImage = () => {};
        this.onError = () => {};
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

    onColorFrame({data, width, height}){
        sharp(Buffer.from(data), {raw: {width, height, channels: 3}})
            .resize(640, 480)
            .flop()
            .webp()
            .toBuffer()
            .then((img) => {
                this.onImage(img);
            }).catch(function(err){
            console.log(err);
        });
    }

    onGrayFrame({data, width, height}){
        // console.log('render');
        sharp(Buffer.from(data), {raw: {width, height, channels: 2}})
            .resize(512, 424)
            .flop()
            .webp()
            .toBuffer()
            .then((img) => {
                this.onImage(img);
            }).catch(function(err){
            console.log(err);
        });
    }

    onError(err){
        return err;
    }
};