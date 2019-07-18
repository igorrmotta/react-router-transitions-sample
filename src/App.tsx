import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Menu } from './components/Menu';
import { SwitchWithSlide } from './SlideSwitch/SlideSwitch';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { Profile } from './pages/Profile';
import { ChangePassword } from './pages/ChangePassword';
import { About } from './pages/About';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />

        <div className="App-content">
          <SwitchWithSlide>
            <Route exact={true} component={Home} path={'/home'} />
            <Route exact={true} component={Product} path={'/product/:productId'} />
            <Route exact={true} component={Subproduct} path={'/subproduct/:subproductId'} />

            <Route exact={true} component={Profile} path={'/profile'} />
            <Route exact={true} component={ChangePassword} path={'/change-password'} />

            <Route exact={true} component={About} path={'/about'} />
          </SwitchWithSlide>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
