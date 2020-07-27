import React from 'react';

import NavBar from '../../components/NavBar';

import './emperor.css';

class Emperor extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="Emperor">
                    bonjour
                </div>
            </div>
        );

    }
}

export default Emperor;