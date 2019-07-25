import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { AppRouter } from './AppRouter';
import { dataRoutes } from './routes';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />

        <Route render={props => <AppRouter routes={dataRoutes} {...props} />} />
      </div>
    </BrowserRouter>
  );
};

export default App;
