import React, { Component } from 'react';
import GooglyEyes from './Components/GooglyEyes';
import Info from './Components/Info';
import './Stylesheets/App.css';

class App extends Component {

    takePicture(){
        this.refs.googlyEyes.picture();
    }

    resetEyes(){
        this.refs.googlyEyes.resetEyes();
    }

    render() {
        return (
            <div className="App">
                <Info/>
                <button onClick={() => this.takePicture()} className="button-stop"/>
                <button onClick={() => this.resetEyes()} className="button-reset"><i className="fa fa-close"/></button>
                <GooglyEyes ref="googlyEyes"/>
            </div>
        );
    }
}

export default App;
