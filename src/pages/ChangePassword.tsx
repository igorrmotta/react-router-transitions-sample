import React from 'react';
import ReactDOM from 'react-dom';

const ChangePassword: React.FC = (props: {}) => {
  const appContainer = document.getElementsByClassName('App')[0];
  if (!appContainer) {
    return null;
  }
  return ReactDOM.createPortal(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <h1>ChangePassword</h1>
    </div>,
    appContainer
  );
};

export { ChangePassword };
