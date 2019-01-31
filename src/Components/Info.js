import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../Stylesheets/App.css';

class Info extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }

    toggleModel = () => {
        this.setState({
            show : !this.state.show
        })
    };


    render(){
        return(
            <div>
                <button type='button' onClick={this.toggleModel} className='button-info'><i class="fa fa-bars"/></button>
                <div className={"modal" + (this.state.show ? ' open' : '')}>
                    <p>Exercice pour MyDigitalSchool</p>
                    <p>Réalisé par Gabriel Ley</p>
                    <p>Appuyez sur le bouton rouge pour bloquer l'image</p>
                    <p>Et appuyez n'importe où sur l'écran pour ajouter des googly eyes</p>
                </div>
            </div>
        );
    }
}

export default Info;