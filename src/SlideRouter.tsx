import React from 'react';
import { RouteType } from './routes';
import { Route } from 'react-router';

type Props = {
  routes: RouteType[];
};
export const SlideRouter: React.FC<Props> = props => {
  return (
    <>
      {props.routes.map(route => {
        return <Route exact={route.exact} path={route.path} component={route.component} />;
      })}
    </>
  );
};
