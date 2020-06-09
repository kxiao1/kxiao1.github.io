import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './components/login';
import Search from './components/search';
import Details from './components/details';
import Favorites from './components/favorites';
import Notfound from './components/notfound';
import { AppContext } from './components/appContext';

function App() {
  return (
    <main>
      <AppContext>
        <Switch>
          <Route path="/" component={Auth} exact />
          <Route path="/search" component={Search} />
          <Route path="/details" component={Details} />
          <Route path="/favorites" component={Favorites} />
          <Route component={Notfound} />
        </Switch>
      </AppContext>
    </main>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
