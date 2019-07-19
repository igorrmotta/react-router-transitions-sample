import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { SwitchWithSlide } from './SlideSwitch/SlideSwitch';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { ChangePassword } from './pages/ChangePassword';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />

        <div className="App-content">
          <SwitchWithSlide>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/product/:productId" exact={true} component={Product} />
            <Route path="/subproduct/:subproductId" exact={true} component={Subproduct} />

            <Route path="/profile" exact={true} component={Profile} />
            <Route path="/change-password" exact={true} component={ChangePassword} />

            <Route path="/about" exact={true} component={About} />
          </SwitchWithSlide>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
