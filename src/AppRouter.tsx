import * as React from 'react';
import { RouteType } from './routes';

type Props = {
  route: string;
  routes: RouteType[];
};

type State = {
  route: string;

  currChild: string;
  nextChild: string | null;
};

class AppRouter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // TODO: change it?!
    const firstRoute = props.routes[0].path;
    this.state = {
      route: props.route,

      currChild: firstRoute,
      nextChild: null
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextRoute = nextProps.route;
    const currRoute = this.state.route;
    if (nextRoute !== currRoute) {
      this.setState({
        route: nextRoute
      });
    }
  }

  render() {
    return <div />;
  }
}

export { AppRouter };
