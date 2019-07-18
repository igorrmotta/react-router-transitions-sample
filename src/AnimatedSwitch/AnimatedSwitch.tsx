// Based on: https://github.com/maisano/react-router-transition.git

import * as React from 'react';
import { Route, Switch, matchPath, match, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';
import RouteTransition, { RouteTransitionProps } from './RouteTransition';

const NO_MATCH = {
  key: 'no-match'
};

/**
 * Not every location object has a `key` property (e.g. HashHistory).
 */
function getLocationKey(location: Location) {
  return typeof location.key === 'string' ? location.key : '';
}

/**
 * Some superfluous work, but something we need to do in order
 * to persist matches/allow for nesting/etc.
 */
function getMatchedRoute(children: Props['children'], pathname: string) {
  return (
    React.Children.toArray(children as React.ReactElement[]).find(child => {
      return matchPath(pathname, {
        exact: child.props.exact,
        path: child.props.path
      });
    }) || NO_MATCH
  );
}

type Props = RouteTransitionProps & { location: Location; match?: match };
type State = {
  key: string;
  match: ReturnType<typeof getMatchedRoute>;
};

class AnimatedSwitch extends React.Component<Props, State> {
  state = {
    key: getLocationKey(this.props.location),
    match: getMatchedRoute(this.props.children, this.props.location.pathname)
  };

  matches = 0;

  componentWillReceiveProps(nextProps: Props) {
    const nextMatch = getMatchedRoute(nextProps.children, nextProps.location.pathname);

    if (this.state.match.key !== nextMatch.key) {
      this.setState({
        match: nextMatch,
        key: getLocationKey(nextProps.location) + ++this.matches
      });
    }
  }

  render() {
    const { children, location, match, ...routeTransitionProps } = this.props;

    return (
      <RouteTransition {...routeTransitionProps}>
        <Switch key={this.state.key} location={location}>
          {children}
        </Switch>
      </RouteTransition>
    );
  }
}

// inject location as a prop so we can listen for changes
const RouteWrapper = (props: RouteTransitionProps & { children: React.ReactNode }) => (
  <Route children={({ location }) => <AnimatedSwitch location={location} {...props} />} />
);

export default RouteWrapper;
