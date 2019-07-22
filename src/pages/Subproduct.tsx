import React from 'react';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<{ subproductId: string }>;

const Subproduct: React.FC<Props> = props => {
  return (
    <div
      style={{
        backgroundColor: '#838383',
        display: 'grid',
        height: '100%',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridColumnGap: 25,
        gridRowGap: 25,
        padding: 25
      }}
    >
      <h1>Subproduct {props.match.params.subproductId}</h1>
    </div>
  );
};

export { Subproduct };
