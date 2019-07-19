import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from './components/Menu';
import PageTransition from 'react-router-page-transition';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />

        <div className="App-content">
          <Route
            render={({ location }) => (
              <PageTransition>
                <div className="transition-item">
                  <Switch location={location}>
                    <Route exact path="/home" component={Home} />
                    <Route path="/profile" component={Profile} />
                  </Switch>
                </div>
              </PageTransition>
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
