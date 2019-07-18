import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = props => {
  return (
    <div
      style={{
        backgroundColor: '#561D25',
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridColumnGap: 25,
        gridRowGap: 25,
        padding: 25
      }}
    >
      <nav>
        <Link to="/product/1"> Product 1 </Link>
        <Link to="/product/2"> Product 2 </Link>
      </nav>
    </div>
  );
};

export { Home };
