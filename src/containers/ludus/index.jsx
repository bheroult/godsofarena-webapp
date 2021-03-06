import React from 'react';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';

import NavBar from '../../components/NavBar';
import ItemButton from '../../components/ItemButton';

import './ludus.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Ludus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            chosenTypes: [],
            animal: false,
            // indicate if a message error has to be displayed
            error: false,
            optionsActivated: false,
        };
    }

    handleChosenType(name) {
        //temp var form chosenTypes
        var tempList = this.state.chosenTypes;

        var index = tempList.indexOf(name);
        if (index > -1) {
            // element already chosen, so delete it
            tempList.splice(index, 1);
            this.setState({
                error: false,
            });
        }
        else if (name === 'Animal') {
            console.log("act : " + this.state.animal);
            // animal is a specific choice
            var activation = !this.state.animal;
            console.log("temp : " + activation);
            this.setState({
                animal: activation,
                error: false,
            });
            localStorage.setItem('animalActivated', activation);
        }
        else if (this.state.chosenTypes.length < 2) {
            // add the element only if possible
            tempList.push(name);
            this.setState({
                error: false,
            });
        }
        else {
            this.setState({
                error: true,
            })
        }

        //update state and local storage
        this.setState({
            chosenTypes: tempList
        });
        localStorage.setItem('chosenTypes', tempList);
    }

    handleOptionActivation(event) {
        var tempActivation = !this.state.optionsActivated;

        // set state
        this.setState({
            optionsActivated: tempActivation,
        });

        // set local storage
        localStorage.setItem('optionsActivated', tempActivation);
    }

    clearChoices() {
        // delete all choices everywhere
        this.setState({
            chosenTypes: [],
            animal: false,
            error: false,
            optionsActivated: false,
        });
        localStorage.setItem('chosenTypes', []);
        localStorage.setItem('animalActivated', false);
        localStorage.setItem('optionsActivated', false);

        // clear options also for Emperor side
        localStorage.setItem('personnas', []);
        localStorage.setItem('confirmedChoices', false);
    }

    // initialize interface with types and choices if some wehere stored already
    componentDidMount() {
        // get types list from API
        fetch(process.env.REACT_APP_API + '/types')
            .then(res => res.json())
            .then((data) => {
                this.setState({ types: data });
            })
            .catch(err => console.error(err));

        // check if choices were already made, and load them from local storage if so
        var animalActivated, chosenTypes, optionsActivated;

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

        optionsActivated = localStorage.getItem('optionsActivated');
        if (optionsActivated == null || optionsActivated === "false") {
            optionsActivated = false;
        }
        else {
            optionsActivated = true;
        }

        this.setState({
            chosenTypes: chosenTypes,
            animal: animalActivated,
            optionsActivated: optionsActivated,
        });
    }


    render() {
        var activatedAnimal = this.state.animal;

        return (
            <div id="ludusContent">
                <NavBar />
                <div className="Ludus">
                    <div className="InfoSection">
                        Choisissez les types de gladiateur que vous souhaitez proposer à l'Empereur. <br />
                        Vous devez choisir 2 types de gladiateur pour que la sélection soit valide. <br />
                        Vous pouvez aussi activez le type animal ainsi la personnalisation d'équipement, si vous le souhaitez.
                    </div>
                    <hr />
                    <br />
                    <div className="HintSection">
                        Cliquez une fois sur un type pour l'ajouter à la liste des sélectionnés, cliquez de nouveau pour le retirer.
                    </div>
                    <div className="GladiatorTypes">
                        {this.state.types.map(item => (
                            <ItemButton key={item} name={item} callAddType={this.handleChosenType.bind(this)} />
                        ))}
                    </div>
                    {this.state.error ?
                        <Alert severity="warning">
                            Vous ne pouvez pas sélectionner plus de 2 types de gladiateurs, hors Animal.
                            Retirez en un de la liste pour ajouter celui que vous voulez.
                        </Alert>
                        : <div></div>
                    }
                    <br />
                    <div className="ChosenTypes">
                        <div>
                            <h5>Personnalisation d'équipement : </h5> <br />
                            <Switch
                                checked={this.state.optionsActivated}
                                onChange={this.handleOptionActivation.bind(this)}
                                name="checkedB"
                                color="primary"
                            />
                            {this.state.optionsActivated ? "Activée" : "Désactivée"}
                        </div>
                        <div>
                            <h5>Types sélectionnés : </h5> <br />
                            {this.state.chosenTypes.length === 0 ? "Vous n'avez choisi aucun type." : ""}
                            {this.state.chosenTypes.toString()}
                        </div>
                        <div>
                            <h5>Le type 'Animal' </h5> <br />
                            {activatedAnimal === true ? " est activé." : "n'est pas activé."}
                        </div>

                    </div>
                    <br />
                    <Button id="deleteChoicesButton" variant="contained" color="secondary" onClick={this.clearChoices.bind(this)}>
                        Supprimer les choix
                    </Button>

                </div>
            </div>
        );
    }
}

export default Ludus;