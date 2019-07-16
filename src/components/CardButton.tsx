import React from 'react';

const style: React.CSSProperties = {
    boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
    transition: `all 0.3s cubic-bezier(.25,.8,.25,1)`,
    display: 'flex',
    flexDirection: 'column',
    padding: 100,
};

const CardButton: React.FC = (props) => {
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}

export { CardButton };