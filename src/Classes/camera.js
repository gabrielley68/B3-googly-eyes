export default class Camera{
    constructor(){
        const constraints = { audio: false, video: true };

        this.video = document.createElement('video');
        // document.body.appendChild(this.video);

        navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                this.video.srcObject = mediaStream;
                this.video.onloadedmetadata = e => {
                    this.video.play();
                };
            })
            .catch(err => { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

        this.snapshot = null;
    }

    toggleSnapshot(){
        if(this.video.paused){
            this.video.play();
        }
        else{
            this.video.pause();
        }
    }
}