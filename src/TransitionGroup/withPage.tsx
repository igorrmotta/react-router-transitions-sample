import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import classNames from 'classnames';
import './Page.css';

type Props = RouteComponentProps<any, any, { prev?: boolean }>;
const withPage = (Component: React.ComponentType<Props>) => {
  return (props: Props) => {
    const isGoingBack =
      (props.location.state && props.location.state.prev) || props.history.action === 'POP';

    const cx = classNames({
      page: true,
      'page--prev': isGoingBack
    });

    return (
      <section className={cx}>
        <div className="page__inner">
          <Component {...props} />
        </div>
      </section>
    );
  };
};
export { withPage };
