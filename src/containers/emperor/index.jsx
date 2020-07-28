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

    handlePersonnaChoices(type, personna) {
        var tempPersonnas = this.state.personnas;
        tempPersonnas.push(personna);
        this.setState({
            personnas: tempPersonnas,
        });
        console.log('personna pushed : ' + JSON.stringify(personna));
    }

    confirmChoices() {
        this.setState({
            confirmed: true,
        });
        localStorage.setItem('personnas', JSON.stringify(this.state.personnas));
        localStorage.setItem('confirmedChoices', true);
    }

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

        animalActivated = localStorage.getItem('animalActivated');
        if (animalActivated == null || animalActivated === "false") {
            animalActivated = false;
        }
        else {
            animalActivated = true;
        }

        chosenTypes = localStorage.getItem('chosenTypes');
        if (chosenTypes == null || chosenTypes === "") {
            chosenTypes = [];
        }
        else {
            // convert datas string to list
            chosenTypes = chosenTypes.split(",");
        }

        confirmationChoices = localStorage.getItem('confirmedChoices');
        if (confirmationChoices == null || confirmationChoices === "false") {
            confirmationChoices = false;
        }
        else {
            confirmationChoices = true;
        }

        personnasChoices = localStorage.getItem('personnas');
        if (personnasChoices == null || personnasChoices === "") {
            personnasChoices = [];
        }
        else {
            // convert datas string to list of objects
            personnasChoices = JSON.parse(personnasChoices.split(','));
        }


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
        if (this.state.confirmed) {
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
        else if (this.state.chosenTypes.length < 2) {
            choices = <div className="GladiatorChoices">
                Aucune sélection valide n'a encore été faite par tes Ludi. Je me permettrai de te suggérer des les houspiller un peu ...
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
                        Tu vas ici pouvoir choisir les gladiateurs qui combattront, parmis ceux proposés par tes <i>Ludi</i>. <br />
                        Pour chaque type de gladiateur, tu pourras choisir celui que tu souhaites, et lui affecter un modifier si cela t'est proposé.
                        Tu pourras même inclure un animal au combat, toujours si cela t'est proposé bien sûr.<br />
                        Une fois ton choix effectué, il ne restera plus qu'à confirmer ton choix !
                    </div>
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