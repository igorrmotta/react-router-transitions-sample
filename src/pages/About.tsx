import React from 'react';

const style: React.CSSProperties = {
  backgroundColor: '#F0CEA0',
  height: '100%'
};

const About: React.FC = (props: {}) => {
  return (
    <div style={style}>
      <h1>About</h1>
    </div>
  );
};

export { About };
