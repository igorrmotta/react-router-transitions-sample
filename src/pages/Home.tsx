import React from 'react';
import { CardButton } from '../components/CardButton';

const Home: React.FC = (props: {}) => {
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
            <CardButton>
                <h3>Product 1</h3>
            </CardButton>

            <CardButton>
                <h3>Product 2</h3>
            </CardButton>
        </div>
    );
}

export { Home };