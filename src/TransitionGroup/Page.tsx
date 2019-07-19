import React from 'react';
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Page.css';

type Props = RouteComponentProps<any, any, { prev?: boolean }>;
const Page: React.FC<Props> = ({ children, location: { state }, history }) => {
  const isGoingBack = (state && state.prev) || history.action === 'POP';

  const cx = classNames({
    page: true,
    'page--prev': isGoingBack
  });

  return (
    <section className={cx}>
      <div className="page__inner">{children}</div>
    </section>
  );
};

export default withRouter(Page);
