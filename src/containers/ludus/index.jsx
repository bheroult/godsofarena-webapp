import React from 'react';
import Button from '@material-ui/core/Button';

import NavBar from '../../components/NavBar';
import ItemButton from '../../components/ItemButton';

import './ludus.css';

class Ludus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            chosenTypes: [],
            animal: false,
        };
    }

    handleChosenType(name) {
        //temp var form chosenTypes
        var tempList = this.state.chosenTypes;

        var index = tempList.indexOf(name);
        if (index > -1) {
            // element already chosen, so delete it
            tempList.splice(index, 1);
        }
        else if (name === 'Animal') {
            // animal is a specific choice
            var activation = !this.state.animal;
            this.setState({
                animal: activation
            });
            localStorage.setItem('animalActivated', activation);
        }
        else if (this.state.chosenTypes.length < 2) {
            // add the element only if possible
            tempList.push(name);
        }

        //update state and local storage
        this.setState({
            chosenTypes: tempList
        });
        localStorage.setItem('chosenTypes', tempList);
    }

    clearChoices() {
        // delete all choices everywhere
        this.setState({
            chosenTypes: [],
            animal: false,
        });
        localStorage.setItem('chosenTypes', []);
        localStorage.setItem('animalActivated', false);
    }

    componentDidMount() {
        // get types list from API
        fetch(process.env.REACT_APP_API + '/types')
            .then(res => res.json())
            .then((data) => {
                this.setState({ types: data });
            })
            .catch(err => console.error(err));

        // check if choices were already made, and load them from local storage if so
        var animalActivated, chosenTypes;
        animalActivated = localStorage.getItem('animalActivated');
        chosenTypes = localStorage.getItem('chosenTypes');
        if (animalActivated == null) {
            animalActivated = false;
        }
        if (chosenTypes == null) {
            chosenTypes = [];
        }
        this.setState({
            chosenTypes: chosenTypes,
            animal: animalActivated,
        });
    }


    render() {
        return (
            <div id="content">
                <NavBar />
                <div className="Ludus">
                    <div className="InfoSection">
                        Choisissez les types que vous souhaitez mettre à disposition de l'Empereur. <br/>
                        Vous devez choisir 2 types de gladiateur, et vous pouvez activez le type animal si vous le souhaitez.
                    </div>
                    <div className="GladiatorTypes">
                        {this.state.types.map(item => (
                            <ItemButton key={item} name={item} callAddType={this.handleChosenType.bind(this)} />
                        ))}
                    </div>
                    <br />
                    <div className="ChosenTypes">
                        {this.state.chosenTypes.length === 0 ? "Vous n'avez choisi aucun type." : "Vous avez choisi les types suivants :"}<br />
                        {this.state.chosenTypes.toString()} <br />
                        Le type 'Animal' {this.state.animal ? " est activé." : "n'est pas activé."}
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