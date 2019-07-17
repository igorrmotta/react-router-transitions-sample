import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Menu } from './components/Menu';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { ChangePassword } from './pages/ChangePassword';

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

            <Route path="/product/:productId" exact={true} component={Product} />
            <Route path="/subproduct/:subproductId" exact={true} component={Subproduct} />

            <Route path="/change-password" exact={true} component={ChangePassword} />

            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
