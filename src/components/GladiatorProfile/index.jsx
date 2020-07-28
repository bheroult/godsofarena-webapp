import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import './gladiatorprofile.css';

/**
 * Style section for Material-ui components re-used
 */
const SelectionForm = withStyles(() => ({
    root: {
        color: '#ffffff',
        margin: '15px 15px',
        fontSize: 40,
        width: '200px',
        height: '100px',
        paddingTop: '30px',
        scrollPaddingBottom: '30px',
    },
}))(FormControl);

const Label = withStyles(() => ({
    root: {
        color: '#ffffff',
    },
}))(InputLabel);

const SelectField = withStyles(() => ({
    root: {
        color: '#ffffff',
    },
}))(Select);

const HelperField = withStyles(() => ({
    root: {
        color: '#ffffff',
    },
}))(FormHelperText);



class GladiatorProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // to store names and modifiers' titles
            gladiators: [],
            personna: {
                name: "",
                type: null,
                modifier: {
                    title: "",
                    option: ""
                },
            },
            // to store options of the modifier
            modifierOptions: null,
        };
    }

    loadModifier(type) {
        // get options from API according to modifier's title
        fetch(process.env.REACT_APP_API + '/modifiers/title/' + type)
            .then(res => res.json())
            .then((data) => {
                var datas = data[0].options;
                this.setState({
                    modifierOptions: datas
                });
            })
            .catch(err => console.error(err));
    }

    handleNameChange(event) {
        var name = event.target.value;
        var tempPersonna = this.state.personna;
        tempPersonna.name = name;
        this.setState({
            personna: tempPersonna,
        });

        // get title of the modifier is one is recorded
        const gladiators = this.state.gladiators;
        var i = 0;
        var title = "";
        while (i < gladiators.length && title === "") {
            if (gladiators[i].name === name) {
                title = gladiators[i].ModifierTitle;
                tempPersonna.modifier.title = title;
                this.setState({
                    personna: tempPersonna,
                });
            }
            i++;
        }

        // if there is a modifier, load its options
        if (title !== "") {
            this.loadModifier(title);
        }
    }

    handleOptionChange(event) {
        var tempPersonna = this.state.personna;
        tempPersonna.modifier.option = event.target.value;

        // update datas
        const setting = new Promise((resolve, reject) => {
            this.setState({
                personna: tempPersonna,
            });
            resolve();
        });

        // send new datas to parent element
        setting.then(() => {
            this.props.confirmPersonna(this.props.type, this.state.personna);
        });
    }

    componentDidMount() {
        // get gladiators from the given type
        fetch(process.env.REACT_APP_API + '/gladiators/type/' + this.props.type)
            .then(res => res.json())
            .then((data) => {
                var tempPersonna = this.state.personna;
                tempPersonna.type = this.props.type;
                this.setState({ 
                    gladiators: JSON.parse(JSON.stringify(data)),
                    personna: tempPersonna,
                 });
            })
            .catch(err => console.error(err));

    }

    render() {
        var modifiers;

        // if there is options of the modifier to load
        if (this.state.modifierOptions != null) {
            modifiers = <SelectionForm className="Form">
                <Label id="demo-simple-select-required-label">Option d'armement</Label>
                <SelectField
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={this.state.personna.modifier.option}
                    onChange={this.handleOptionChange.bind(this)}
                >
                    <MenuItem value="">
                        <em>Choisissez l'option</em>
                    </MenuItem>
                    {this.state.modifierOptions.map(item => (
                        <MenuItem key={item} value={item} >
                            {item}
                        </MenuItem>
                    ))}
                </SelectField>
                <HelperField>Obligatoire</HelperField>
            </SelectionForm>;

        }

        return (
            <div className="GladiatorProfile">
                {this.props.type} <br />

                <SelectionForm className="Form">
                    <Label id="demo-simple-select-required-label">Nom</Label>
                    <SelectField
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={this.state.personna.name}
                        onChange={this.handleNameChange.bind(this)}
                    >
                        <MenuItem value="">
                            <em>Choisissez le nom</em>
                        </MenuItem>
                        {this.state.gladiators.map(item => (
                            <MenuItem key={item.name} value={item.name} >
                                {item.name}
                            </MenuItem>
                        ))}
                    </SelectField>
                    <HelperField>Obligatoire</HelperField>
                </SelectionForm>

                <br />

                {modifiers}

            </div>
        );
    }
}

export default GladiatorProfile;