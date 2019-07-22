import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { History } from 'history';
import { SlideAnimator } from './SlideAnimator';
import { FadeAnimator } from './FadeAnimator';

export type AnimatorChildrenType = React.ReactElement<any, string>;

export type AnimatorProps = {
  children: AnimatorChildrenType;
  uniqKey: string;
  history: History;
};

const animateSwitch = (
  CustomSwitch: React.ComponentType<SwitchProps>,
  AnimatorComponent: React.ComponentType<AnimatorProps>
) => (props: { children: any }) => (
  <Route
    render={({ location, history }) => (
      <AnimatorComponent uniqKey={location.pathname} history={history}>
        <CustomSwitch location={location}>{props.children}</CustomSwitch>
      </AnimatorComponent>
    )}
  />
);

const SwitchWithSlide = animateSwitch(Switch, SlideAnimator);
const SwitchWithFade = animateSwitch(Switch, FadeAnimator);

export { SwitchWithSlide, SwitchWithFade };
