import React from 'react';
import { BrowserRouter, Route, matchPath } from 'react-router-dom';
import { Menu } from './components/Menu';
import AnimatedSwitch from './AnimatedSwitch/AnimatedSwitch';
import './App.css';
import './SlideSwitch/Slider.css';
import { RouteType, dataRoutes } from './routes';

const findRoute = (routes: RouteType[], actualRoute: string): RouteType | undefined => {
  for (const r of routes) {
    const isRoute = matchPath(actualRoute, { path: r.path, exact: true });
    if (isRoute) {
      return r;
    }
  }

  return undefined;
};

const mayInverse = (num: number, b: boolean) => (!!b ? num * -1 : num);

const App: React.FC = () => {
  let path: string;

  return (
    <BrowserRouter>
      <div className="App">
        <Menu />

        <Route
          render={({ location, history }) => {
            const isBack = history.action === 'POP';

            let route: RouteType | undefined = undefined;
            if (!isBack || !path) {
              // If I'm going forward or initial state
              // I want to find the animation of the page
              // I'm heading to

              path = location.pathname;
              route = findRoute(dataRoutes, path);
            } else {
              // If I'm going back
              // I want to find the animation of the last page
              // I visited

              route = findRoute(dataRoutes, path);
              path = location.pathname;
            }

            if (!route) {
              // 404
              return null;
            }

            let atEnter, atLeave, atActive, styles;
            switch (route.transition) {
              case 'slide':
                atEnter = { offset: mayInverse(100, isBack), opacity: 1 };
                atLeave = { offset: mayInverse(-100, isBack), opacity: 1 };
                atActive = { offset: 0, opacity: 1 };
                styles = (s: any) => ({ transform: `translateX(${s.offset}%)` });
                break;

              case 'zoom':
              case 'fade':
                atEnter = { opacity: 0, offset: 0 };
                atLeave = { opacity: 0, offset: 0 };
                atActive = { opacity: 1, offset: 0 };
                styles = (s: any) => ({ opacity: s.opacity });
                break;

              default:
                throw Error(`unknown route transition ${route.transition}`);
            }

            return (
              <AnimatedSwitch
                className="animator-container"
                atEnter={atEnter}
                atLeave={atLeave}
                atActive={atActive}
                runOnMount={location.pathname === '/'}
                mapStyles={styles}
              >
                {dataRoutes.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </AnimatedSwitch>
            );
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
