import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Menu } from './components/Menu';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">

        <Menu />

        <div className="App-content">
          <Switch>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/about" exact={true} component={About} />

            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
