import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AutorBox from './components/Autor';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch } from 'react-router'
import history from './history'

ReactDOM.render(
    (<Router history={history}>
        <Switch>
            <Route exact={true} path="/" component={App} />
            <Route path="/autor/" component={AutorBox} />
            <Route path="/livro/" />
        </Switch>
    </Router>), 
    document.getElementById('root')
);
registerServiceWorker();
