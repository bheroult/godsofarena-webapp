import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import homeImage from '../../assets/gladiator-fight.jpg';
import './Home.css';

const LudusButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#2e862d',
    '&:hover': {
      backgroundColor: '#2d8659',
    },
    margin: '15px 15px',
  },
}))(Button);

const EmperorButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: '#862d86',
    '&:hover': {
      backgroundColor: '#592d86',
    },
    margin: '15px 15px',
  },
}))(Button);

class Home extends React.Component {

  render() {
    return (
      <div className="Home" id="home">
        <img src={homeImage} className="Home-image" alt="Gladiators' fight" />

        <h1>Bienvenue sur Gods of Arena !</h1>

        <p>Grâce à ce système innovant, vous, <i>Ludi</i>, pourrez proposer des gladiateurs pour les jeux. <br />
          Et vous, ô Empereur, pourrez choisir parmi les gladiateurs proposés ceux qui combattront dans l'arène !</p>
        <p>
          Bons jeux à tous !
        </p>

        <div className="Buttons">
          <LudusButton variant="contained" size="large" href="/ludus">
            Espcace Ludus
          </LudusButton>

          <EmperorButton variant="contained" size="large" href="/emperor">
            Espace Empereur
          </EmperorButton>
        </div>

      </div>
    );
  }
}

export default Home;
