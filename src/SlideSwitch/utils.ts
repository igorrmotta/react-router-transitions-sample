import React from 'react';
import { SwitchProps, RouteProps, matchPath } from 'react-router';

export type TransitionType = 'slide' | 'fade' | 'zoom';
type RP = RouteProps & { transitionName: TransitionType };
type P = SwitchProps | RP;

export const shouldAnimate = (
  transitionType: TransitionType,
  routePath: string,
  children: React.ReactElement<P> | React.ReactElement<P>[]
): boolean => {
  console.warn('shouldAnimate >>> ', children);
  if (React.Children.count(children) === 1) {
    const onlyChild = React.Children.only(children) as React.ReactElement<P>;

    // If it's a route - check if the route matches
    const childPath = (onlyChild.props as RP).path;
    // const childTransition = (onlyChild.props as RP).transitionName;
    if (!!childPath) {
      const isValidMatch = !!matchPath(routePath, { path: childPath, exact: true });
      // const isValidTransition = childTransition === transitionType;
      if (isValidMatch) {
        console.error('TARGET!');
      }
      return isValidMatch;
    }
  }

  const bValidAnimatedNode = !!React.Children.toArray(children).find((child, index) => {
    console.log('child >>>', index, child);
    if (!!child.props.children) {
      const childrenArray = React.Children.toArray(child.props.children) as React.ReactElement<P>[];
      return shouldAnimate(transitionType, routePath, childrenArray);
    } else {
      return shouldAnimate(transitionType, routePath, child);
    }
  });

  console.warn('bValidAnimatedNode >>> ', bValidAnimatedNode);
  return bValidAnimatedNode;
};

export const reflow = (node: HTMLElement) => node.scrollTop;

export type TransitionInjectedProps = {
  style?: React.CSSProperties;
};

export type TransitionProps = {
  children: React.ReactElement<TransitionInjectedProps> | null;

  in?: boolean;
  style?: React.CSSProperties;
  onEnter?: (node: HTMLElement) => void;
  onEntering?: (node: HTMLElement) => void;
  onEntered?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
  onExited?: (node: HTMLElement) => void;
};
