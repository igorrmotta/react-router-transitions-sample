import React from 'react';
import { Link } from 'react-router-dom';

const style: React.CSSProperties = {
  backgroundColor: '#29335C',
  height: '100%'
};

const Profile: React.FC = (props: {}) => {
  return (
    <div style={style}>
      <h1>Profile</h1>
      <nav>
        <Link to="/change-password">Change Password</Link>
      </nav>
    </div>
  );
};

export { Profile };
