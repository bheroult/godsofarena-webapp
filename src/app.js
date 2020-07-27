import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './containers/home/Home';
import Ludus from './containers/ludus';
import Emperor from './containers/emperor';

const App = () => (
    <div id="app">
        <Router>

            <div id="page">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/ludus" exact component={Ludus} />
                    <Route path="/emperor" exact component={Emperor} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </Router>
    </div>
);

export default App;
