import React from 'react';
import { RouteType } from './routes';
import { Route } from 'react-router';
import AnimatedSwitch from './AnimatedSwitch/AnimatedSwitch';
import { presets, spring } from 'react-motion';
import './Router.css';

type SwitchProps = { children: React.ReactElement | React.ReactElement[] | React.ReactElement[][] };

const ZoomSwitch: React.FC<SwitchProps> = props => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper zoom-switch"
    >
      {props.children}
    </AnimatedSwitch>
  );
};

const FadeSwitch: React.FC<SwitchProps> = props => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper fade-switch"
    >
      {props.children}
    </AnimatedSwitch>
  );
};

const SlideSwitch: React.FC<SwitchProps> = props => {
  return (
    <AnimatedSwitch
      atEnter={{
        opacity: spring(0, { stiffness: 330, damping: 22 }).val,
        translateX: spring(window.innerWidth, presets.gentle).val
      }}
      atLeave={{
        opacity: spring(0, { stiffness: 330, damping: 22 }).val,
        translateX: spring(window.innerWidth, presets.gentle).val
      }}
      atActive={{
        opacity: spring(1, { stiffness: 330, damping: 22 }).val,
        translateX: spring(0, presets.gentle).val
      }}
      mapStyles={(styles: any) => {
        return {
          opacity: styles.opacity,
          transform: `translateX(${styles.translateX}px)`
        };
      }}
      className="switch-wrapper slide-switch"
    >
      {props.children}
    </AnimatedSwitch>
  );
};

type TransitionType = 'fade' | 'slide' | 'zoom';
type SwitchComponentProps = SwitchProps & { transition: TransitionType };
const SwitchComponent: React.FC<SwitchComponentProps> = props => {
  switch (props.transition) {
    case 'fade':
      return <FadeSwitch {...props} />;

    case 'slide':
      return <SlideSwitch {...props} />;

    case 'zoom':
      return <ZoomSwitch {...props} />;

    default:
      throw Error(`Unknown switch component transition ${props.transition}`);
  }
};

type RouterComponentProps = {
  routes: RouteType[];
  transition?: TransitionType;
};
export const RouterComponent: React.FC<RouterComponentProps> = props => {
  return (
    <SwitchComponent transition={props.transition || 'fade'}>
      {props.routes.map(route => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}

      {props.routes.map(route => {
        return (
          <React.Fragment key={'children - ' + route.path}>
            {!!route.fadeChildren && (
              <RouterComponent routes={route.fadeChildren} transition={'fade'} />
            )}
            {!!route.slideChildren && (
              <RouterComponent routes={route.slideChildren} transition={'slide'} />
            )}
            {!!route.zoomChildren && (
              <RouterComponent routes={route.zoomChildren} transition={'zoom'} />
            )}
          </React.Fragment>
        );
      })}
    </SwitchComponent>
  );
};
