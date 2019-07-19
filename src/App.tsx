import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { ChangePassword } from './pages/ChangePassword';
import './App.css';
import './TransitionGroup/Page.css';

const supportsHistory = 'pushState' in window.history;

const App: React.FC = () => {
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <div className="App">
        <Menu />

        <div className="App-content">
          <Route
            render={({ location }) => {
              const { pathname } = location;
              return (
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={pathname}
                    classNames="page"
                    timeout={{
                      enter: 1000,
                      exit: 1000
                    }}
                  >
                    <Route
                      location={location}
                      render={() => (
                        <Switch>
                          <Route path="/home" exact={true} component={Home} />
                          <Route path="/product/:productId" exact={true} component={Product} />
                          <Route
                            path="/subproduct/:subproductId"
                            exact={true}
                            component={Subproduct}
                          />

                          <Route path="/profile" exact={true} component={Profile} />
                          <Route path="/change-password" exact={true} component={ChangePassword} />

                          <Route path="/about" exact={true} component={About} />
                        </Switch>
                      )}
                    />
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
