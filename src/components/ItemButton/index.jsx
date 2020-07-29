import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

var backColor = '#86592d';
const CustomButton = withStyles(() => ({
    root: {
        color: 'white',
        backgroundColor: backColor,
        '&:hover': {
            backgroundColor: '#2d5a86',
        },
        '&:checked': {
            backgroundColor: '#78862d',
        },
        margin: '15px 15px',
        width: '150px',
        height: '150px',
    },
}))(Button);

class ItemButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            chosenTypes: [],
            checked: true,
        };

    }

    askToAddType () {
        this.props.callAddType(this.props.name);
    }

    render() {
        const name = this.props.name;
        return (
            <CustomButton variant="contained" size="large" onClick={this.askToAddType.bind(this)} >
                {name}
            </CustomButton>
        );

    }
}

export default ItemButton;