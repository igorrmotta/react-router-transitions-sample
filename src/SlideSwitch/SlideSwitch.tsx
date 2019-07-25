import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { History } from 'history';
import { SlideAnimator } from './SlideAnimator';
import { FadeAnimator } from './FadeAnimator';
import { TransitionType } from './utils';

export type AnimatorChildrenType = React.ReactElement<any, string>;

export type AnimatorProps = {
  children: AnimatorChildrenType;
  uniqKey: string;
  history: History;
  onDone?: () => void;
};

const animateSwitch = (
  CustomSwitch: React.ComponentType<SwitchProps & { transitionName: string }>,
  AnimatorComponent: React.ComponentType<AnimatorProps>,
  transitionName: TransitionType
) => (props: { children: any; onDone?: () => void }) => {
  return (
    <Route
      render={({ location, history }) => (
        <AnimatorComponent onDone={props.onDone} uniqKey={location.pathname} history={history}>
          <CustomSwitch transitionName={transitionName} location={location}>
            {props.children}
          </CustomSwitch>
        </AnimatorComponent>
      )}
    />
  );
};

// TODO: redeclare typeos of Switch props to include TransitionName there
const SwitchWithSlide = animateSwitch(Switch as any, SlideAnimator, 'slide');
const SwitchWithFade = animateSwitch(Switch as any, FadeAnimator, 'fade');

export { SwitchWithSlide, SwitchWithFade };
