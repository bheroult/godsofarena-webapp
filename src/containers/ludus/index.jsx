import React from 'react';

import NavBar from '../../components/NavBar';

import './ludus.css';

class Ludus extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="Ludus">
                    bonjour
                </div>
            </div>
        );
    }
}

export default Ludus;