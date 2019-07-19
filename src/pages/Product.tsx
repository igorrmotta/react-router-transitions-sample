import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Page from '../TransitionGroup/Page';

type Props = RouteComponentProps<{ productId: string }>;

const Product: React.FC<Props> = props => {
  return (
    <Page>
      <div
        style={{
          backgroundColor: '#123123',
          display: 'grid',
          height: '100%',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gridColumnGap: 25,
          gridRowGap: 25,
          padding: 25
        }}
      >
        <h1>Product {props.match.params.productId}</h1>

        <nav>
          <Link to="/subproduct/1">Subproduct 1</Link>
          <Link to="/subproduct/2">Subproduct 2</Link>
        </nav>
      </div>
    </Page>
  );
};

export { Product };
