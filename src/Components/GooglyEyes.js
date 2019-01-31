import React, {Component} from 'react';
import '../Stylesheets/App.css';
import Physic from '../Classes/physic';
import Eye from '../Classes/eye';
import Camera from '../Classes/camera';

class GooglyEyes extends Component {
    constructor(props)
    {
        super(props);
        this.camera = new Camera();
        this.eyes = [];
    }

    picture(){
        this.camera.toggleSnapshot();
    }

    componentDidMount() {
        this.physic = new Physic(this.refs.canvas);

        this.ctx = this.refs.canvas.getContext('2d');
        this.draw();
        this.physic.addMouse();

        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;

        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('devicemotion', this.updateMotion.bind(this));

        this.refs.canvas.addEventListener('touchstart', this.onClick.bind(this), false);
        this.refs.canvas.addEventListener('click', this.onClick.bind(this), false);

        if(!window.DeviceMotionEvent) {
            alert("Ce site nécessite la détection d'orientation de téléphone");
        }
    }

    updateMotion(event) {
        let x = event.accelerationIncludingGravity.x;
        let y = event.accelerationIncludingGravity.y;
        // let z = event.accelerationIncludingGravity.z;

        this.physic.updateGravity(x,y);
    }

    onResize(){
        this.physic.resize();
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;
    }


    draw(){
        requestAnimationFrame(() => this.draw());

        this.physic.update();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        //UTILS : RESIZE IMAGE (ici caméra) DANS UN CANVAS
        let videoWidth = this.camera.video.videoWidth;
        let videoHeight = this.camera.video.videoHeight;
        let ratio = Math.min(window.innerWidth/videoWidth, window.innerHeight/videoHeight);

        let newVideoWidth = videoWidth * ratio;
        let newVideoHeight = videoHeight * ratio;
        let newX = (window.innerWidth - newVideoWidth)/2;
        let newY = (window.innerHeight - newVideoHeight)/2;

        this.ctx.drawImage(this.camera.video, 0, 0, videoWidth, videoHeight, newX, newY, newVideoWidth, newVideoHeight);

        for(let i = 0; i < this.eyes.length; i++){
            this.eyes[i].render(this.ctx);
        }
    }

    onClick(e) {
        if(e.targetTouches){
            e = e.targetTouches[0];
        }
        let eye = new Eye(this.physic.world);
        eye.updatePosition(e.clientX, e.clientY);
        this.eyes.push(eye);
    }

    resetEyes(){
        this.eyes = [];
    }

    render(){
        return(
          <canvas onClick={e => this.onClick(e)} className="GooglyEyes" ref="canvas">

          </canvas>
        );
    }
}

export default GooglyEyes;