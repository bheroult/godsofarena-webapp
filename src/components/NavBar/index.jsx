import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import './navbar.css';

const LudusButton = withStyles(() => ({
    root: {
        color: 'white',
        '&:hover': {
            backgroundColor: '#2d8659',
        },
        margin: '15px 15px',
        width: "200px",
    },
}))(Button);

const EmperorButton = withStyles(() => ({
    root: {
        color: 'white',
        '&:hover': {
            backgroundColor: '#592d86',
        },
        margin: '15px 15px',
        width: "200px",
    },
}))(Button);

const HomeButton = withStyles(() => ({
    root: {
        color: 'white',
        '&:hover': {
            backgroundColor: '#86592d',
        },
        margin: '15px 15px',
        width: "200px",
    },
}))(Button);

class NavBar extends React.Component {
    render() {
        return (
            <div className="NavBar">
                <LudusButton size="large" href="/ludus">
                    Espcace Ludus
                </LudusButton>

                <HomeButton size="large" href="/">
                    Accueil
                </HomeButton>

                <EmperorButton size="large" href="/emperor">
                    Espace Empereur
                </EmperorButton>
            </div>
        );

    }
}

export default NavBar;