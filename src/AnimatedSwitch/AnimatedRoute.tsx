import React from 'react';
import { Route, matchPath, match } from 'react-router-dom';

import RouteTransition, { RouteTransitionProps } from './RouteTransition';
import { Location } from 'history';

/**
 * Here we only care about whether or not the pathname matches. If so,
 * we'll use the route's path as the key, otherwise we'll default it
 * to a string signifying no match.
 */
function getKey({ pathname }: Location, path?: string, exact?: boolean) {
  return matchPath(pathname, { exact, path }) ? 'match' : 'no-match';
}

const AnimatedRoute = ({ component, path, exact, ...routeTransitionProps }: any) => (
  <Route
    render={({ location, match }) => (
      <RouteTransition {...routeTransitionProps}>
        <Route
          key={getKey(location, path, exact)}
          path={path}
          exact={exact}
          location={location}
          component={component}
        />
      </RouteTransition>
    )}
  />
);

export default AnimatedRoute;
