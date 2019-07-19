import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../TransitionGroup/Page';

const style: React.CSSProperties = {
  backgroundColor: '#29335C',
  height: '100%'
};

const Profile: React.FC = (props: {}) => {
  return (
    <Page>
      <div style={style}>
        <h1>Profile</h1>
        <nav>
          <Link to="/change-password">Change Password</Link>
        </nav>
      </div>
    </Page>
  );
};

export { Profile };
