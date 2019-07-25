import * as React from 'react';
import { RouteType } from './routes';
import { FadeAnimator } from './SlideSwitch/FadeAnimator';
import { SlideAnimator } from './SlideSwitch/SlideAnimator';
import { matchPath, RouteComponentProps } from 'react-router';

const findRoute = (routes: RouteType[], actualRoute: string): RouteType | undefined => {
  for (const r of routes) {
    const isRoute = matchPath(actualRoute, { path: r.path, exact: true });
    if (isRoute) {
      return r;
    }

    if (r.children) {
      const found = findRoute(r.children, actualRoute);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
};

const getRouteAnimation = (route: RouteType) => {
  switch (route.transition) {
    case 'zoom':
    case 'fade':
      return FadeAnimator;

    case 'slide':
      return SlideAnimator;

    default:
      throw Error(`Unknown animation ${route.transition}`);
  }
};

type Props = RouteComponentProps & { routes: RouteType[] };

type State = {
  routePath: string;

  currentRoute: RouteType | undefined;
  nextRoute: RouteType | undefined;
};

class AppRouter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const routeItem = findRoute(props.routes, props.location.pathname);
    if (!routeItem) {
      throw Error(`wrong route ${props.location.pathname}`);
    }

    this.state = {
      routePath: props.location.pathname,

      currentRoute: routeItem,
      nextRoute: undefined
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextRoutePath = nextProps.location.pathname;
    const currRoutePath = this.state.routePath;

    if (nextRoutePath !== currRoutePath) {
      const nextRouteItem = findRoute(nextProps.routes, nextRoutePath);
      if (!nextRouteItem) {
        // 404!?!?
        throw Error(`Cannot find nextRoute ${nextRoutePath}`);
      }

      this.setState({
        routePath: nextRoutePath,
        nextRoute: nextRouteItem
      });
    }
  }

  onDone = () => {
    console.error('setCurrentWithNext >>> nextRoute', this.state.nextRoute);
    console.error('setCurrentWithNext >>> currentRoute', this.state.currentRoute);
    const { currentRoute, nextRoute } = this.state;
    if (!currentRoute || !nextRoute) {
      return;
    }

    if (currentRoute.transition === nextRoute.transition) {
      this.setState({ currentRoute: nextRoute });
    }
  };

  render() {
    const { currentRoute, nextRoute, routePath } = this.state;
    const { history } = this.props;

    const CurrentAnimatorComponent = currentRoute ? getRouteAnimation(currentRoute) : null;
    const CurrentRouteComponent = !!currentRoute ? (currentRoute.component as any) : null;

    const NextAnimatorComponent = nextRoute ? getRouteAnimation(nextRoute) : null;
    const NextRouteComponent = nextRoute ? (nextRoute.component as any) : null;

    console.error('render >>> currentRoute', !!currentRoute, CurrentAnimatorComponent);
    console.error('render >>> nextRoute', !!nextRoute, NextAnimatorComponent);
    return (
      <div className="animator-container">
        <CurrentRouteComponent {...this.props} />

        {NextAnimatorComponent && (
          <NextAnimatorComponent history={history} uniqKey={routePath} onDone={this.onDone}>
            <NextRouteComponent {...this.props} />
          </NextAnimatorComponent>
        )}
      </div>
    );
  }
}

export { AppRouter };
