/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); */

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './App';
import './index.css';
import ProcessSearch from './lawsuit-search/LawsuitSearch';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    (<BrowserRouter>
        <Switch>
            <Route path="">
                <Admin>
                    <Route path="" component={ProcessSearch}/>
                </Admin>
            </Route>
        </Switch>
    </BrowserRouter>)
, document.getElementById('root'));

serviceWorker.unregister();
