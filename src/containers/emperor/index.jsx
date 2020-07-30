import React from 'react';
import Button from '@material-ui/core/Button';

import NavBar from '../../components/NavBar';
import GladiatorProfile from '../../components/GladiatorProfile';
import EmperorChoice from '../../components/EmperorChoice';

import './emperor.css';

class Emperor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            chosenTypes: [],
            animal: false,
            confirmed: false,
            personnas: []
        };
    }

    handlePersonnaChoices(personna) {
        var tempPersonnas = this.state.personnas;
        
        // check if personna choice was already registered
        var toDelete = null
        for(let i=0 ; i<tempPersonnas.length ; i++){
            if(personna.type === tempPersonnas[i].type){
                toDelete = i;
            }
        }
        // delete if necessary
        if(toDelete !== null){
            tempPersonnas.splice(toDelete, 1);
        }

        // add personna
        tempPersonnas.push(personna);
        this.setState({
            personnas: tempPersonnas,
        });
    }

    // allow the Emperor to validate choices made
    confirmChoices() {
        this.setState({
            confirmed: true,
        });
        localStorage.setItem('personnas', JSON.stringify(this.state.personnas));
        localStorage.setItem('confirmedChoices', true);
    }

    // allow to delete choices validated
    deleteChoices(){
        this.setState({
            confirmed: false,
            personnas: [],
        });
        localStorage.setItem('personnas',[]);
        localStorage.setItem('confirmedChoices', false);
    }

    componentDidMount() {
        // check if Ludi made choices already, and load them from local storage if so
        var animalActivated, chosenTypes, confirmationChoices, personnasChoices;

        // whether animal is activated or not
        animalActivated = localStorage.getItem('animalActivated');
        if (animalActivated == null || animalActivated === "false") {
            animalActivated = false;
        }
        else {
            animalActivated = true;
        }

        // if choices where already confirmed by the Emperor
        confirmationChoices = localStorage.getItem('confirmedChoices');
        if (confirmationChoices == null || confirmationChoices === "false") {
            confirmationChoices = false;
        }
        else {
            confirmationChoices = true;
        }

        // choices that where made and confirmed by the Emperor
        personnasChoices = localStorage.getItem('personnas');
        if (personnasChoices == null || personnasChoices === "") {
            personnasChoices = [];
        }
        else {
            // convert datas string to list of objects
            personnasChoices = JSON.parse(personnasChoices.split(','));
        }

        // types chosen by Ludi
        chosenTypes = localStorage.getItem('chosenTypes');
        if (chosenTypes == null || chosenTypes === "") {
            chosenTypes = [];
        }
        else {
            // convert datas string to list
            chosenTypes = chosenTypes.split(",");
            /*if(chosenTypes !== this.state.chosenTypes){
                confirmationChoices = false;
                personnasChoices = [];
            }*/
        }

        // set stored datas
        this.setState({
            chosenTypes: chosenTypes,
            animal: animalActivated,
            confirmed: confirmationChoices,
            personnas: personnasChoices,
        });
    }

    render() {
        var activatedAnimal = this.state.animal;

        var choices;
        if (this.state.chosenTypes.length < 2) {
            choices = <div className="GladiatorChoices">
                Aucune sélection valide n'a encore été faite par tes Ludi. <br />
                Je me permettrais de te suggérer de les houspiller un peu ...
            </div>;
        }
        else if (this.state.confirmed) {
            choices = <div>
                <p>Vous avez effectué les choix suivants :</p>
                <div className="GladiatorChoices">
                    {this.state.personnas.map(item => (<EmperorChoice key={item.name} infos={item} />))}
                </div>
                <Button id="deleteChoicesButton" variant="contained" color="secondary" onClick={this.deleteChoices.bind(this)}>
                    Supprimer les choix
                </Button>
            </div>;
        }
        else {
            choices = <div>
                <div className="GladiatorChoices">
                    {this.state.chosenTypes.map(item => (<GladiatorProfile key={item} type={item} confirmPersonna={this.handlePersonnaChoices.bind(this)} />))}

                    {activatedAnimal === true ?
                        <GladiatorProfile key='Animal' type='Animal' confirmPersonna={this.handlePersonnaChoices.bind(this)} />
                        : <p>Le type 'Animal' n'est pas activé.</p>
                    }
                </div>

                {(this.state.animal && this.state.personnas.length === 3) || (this.state.animal === false && this.state.personnas.length === 2) ?
                    <Button id="confirmChoicesButton" variant="contained" color="primary" onClick={this.confirmChoices.bind(this)}>
                        Confirmer les choix
                    </Button>
                    : <div></div>
                }
            </div>;
        }

        return (
            <div id="emperorContent">
                <NavBar />
                <div className="Emperor">
                    <div className="InfoDiv">
                        <h2>Salut à toi, ô Empereur ! </h2>
                        Tu vas ici pouvoir choisir les gladiateurs qui combattront, parmi ceux proposés par tes <i>Ludi</i>. <br />
                        Pour chaque gladiateur, tu pourras également choisir une option d'équipement si cela t'est proposé !<br />
                        Tu pourras même inclure un animal au combat, toujours si cela t'est proposé bien sûr.<br /> <br />
                        Une fois tes choix effectués, il ne restera plus qu'à confirmer grâce au bouton qui apparaîtra !
                    </div>
                    <hr/>
                    <div className="Selection">
                        {choices}
                    </div>
                    <br />
                </div>
            </div>
        );

    }
}

export default Emperor;