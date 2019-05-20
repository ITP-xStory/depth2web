class Depth2Web{

    constructor(addr){
        this.socket = io(addr);
        this.depthBlob;
        this.colorBlob;
        this.depthImg = document.createElement('img');
        this.depthImg.id = "depthImg";

        this.depthURL;
        this.colorURL;
        this.colorImg = document.createElement('img');
        this.colorImg.id = "colorImg";


        this.socket.on('image', ({device, img, frameType}) => {

            if(frameType == "depth"){
                this.depthBlob = new Blob([img], {type: 'image/webp'});
                this.depthURL = URL.createObjectURL(this.depthBlob);
                if(document.getElementById('depthImg')) {
                    document.getElementById('depthImg').src = this.depthURL;
                }
            }

            if(frameType == "color"){
                this.colorBlob = new Blob([img], {type: 'image/webp'});
                this.colorURL = URL.createObjectURL(this.colorBlob);
                if(document.getElementById('colorImg')) {
                    document.getElementById('colorImg').src = this.colorURL;
                }
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
        if(document.getElementById('depthImg') == null && this.depthURL != null){
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