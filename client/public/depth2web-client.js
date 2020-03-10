class Depth2Web{

    constructor(addr){
        this.socket = io(addr);

        this.imgWidth = 320;
        this.imgHeight = 240;

        this.depthBlob = [];
        this.colorBlob = [];

        this.depthURL = [];
        this.colorURL = [];

        this.socket.on('image', ({device, id, img, frameType}) => {

            if(frameType == "depth"){

                this.depthBlob[id] = new Blob([img], {type: 'image/webp'});
                this.depthURL[id] = URL.createObjectURL(this.depthBlob[id]);
            }

            if(frameType == "color"){
                this.colorBlob[id] = new Blob([img], {type: 'image/webp'});
                this.colorURL[id] = URL.createObjectURL(this.colorBlob[id]);
            }

        });
    }

    getDepthBlob(){
        if(this.depthBlob){
            return this.depthBlob;
        }else{
            console.log("depth blob is not received");
        }
    }

    getDepthURL(){
        if(this.depthURL){
            return this.depthURL;
        }else{
            console.log("depth url is not received");
        }
    }

    displayDepthImage(){
        while(document.getElementById('depthImg') == null && this.depthURL != null){
            document.body.append(this.depthImg);
        }
    }

    getColorBlob(){
        if(this.colorBlob){
            return this.colorBlob;
        }else{
            return "color blob is not received";
        }
    }

    getColorURL(){
        if(this.colorURL){
            return this.colorURL;
        }else{
            return "color url is not received";
        }
    }

    displayColorImage(){
        if(document.getElementById('colorImg') == null && this.colorURL != null){
            document.body.append(this.colorImg);
        }
    }

}