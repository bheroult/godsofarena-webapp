import React from 'react';
import homeImage from '../../assets/gladiator-fight.jpg';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={homeImage} className="Home-image" alt="Gladiators' fight" />

          <h1>Bienvenue sur Gods of Arena !</h1>

          <p>Grâce à ce système innovant, vous, Ludi, pourrez proposer des gladiateurs pour les jeux. <br/>
            Et vous, ô Empereur, pourrez choisir parmi les gladiateurs proposés ceux qui combattront dans l'arène !</p>
          <p>
            Bon jeux à tous !
            </p>

        </header>

      </div>
    );
  }
}

export default App;
