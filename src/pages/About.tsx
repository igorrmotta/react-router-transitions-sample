import React from 'react';
import Page from '../TransitionGroup/Page';

const style: React.CSSProperties = {
  backgroundColor: '#F0CEA0',
  height: '100%'
};

const About: React.FC = (props: {}) => {
  return (
    <Page>
      <div style={style}>
        <h1>About</h1>
      </div>
    </Page>
  );
};

export { About };
