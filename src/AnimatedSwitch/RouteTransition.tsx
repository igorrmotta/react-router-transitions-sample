// Based on: https://github.com/maisano/react-router-transition.git

import * as React from 'react';
import { TransitionMotion, Style, TransitionPlainStyle, TransitionStyle } from 'react-motion';
import ensureSpring from './ensureSpring';

const identity = (val: any) => val;

export type RouteTransitionProps = {
  children: React.ReactElement | React.ReactElement[] | React.ReactElement[][];
  atEnter: any; // PlainStyle | OpaqueConfig;
  atActive: any; // PlainStyle | OpaqueConfig;
  atLeave: any; // PlainStyle | OpaqueConfig;
  runOnMount?: boolean;
  mapStyles?: (styles: Style) => any;
  wrapperComponent?: keyof React.ReactHTML | string | boolean;

  didLeave?: (style: TransitionStyle) => void;
  className?: string;
};

class RouteTransition extends React.Component<RouteTransitionProps> {
  static defaultProps = {
    wrapperComponent: 'div',
    runOnMount: false,
    mapStyles: identity
  };

  getDefaultStyles(): Array<TransitionPlainStyle> | undefined {
    if (!this.props.runOnMount) {
      return undefined;
    }

    if (!this.props.children || Array.isArray(this.props.children)) {
      return [];
    }

    return [
      {
        key: (this.props.children.key || '') + '',
        data: this.props.children,
        style: this.props.atEnter
      }
    ];
  }

  // there's only ever one route mounted at a time,
  // so just return the current match
  getStyles(): Array<TransitionStyle> {
    if (!this.props.children || Array.isArray(this.props.children)) {
      return [];
    }

    return [
      {
        key: (this.props.children.key || '') + '',
        data: this.props.children,
        style: ensureSpring(this.props.atActive)
      }
    ];
  }

  willEnter = () => {
    return this.props.atEnter;
  };

  willLeave = () => {
    return ensureSpring(this.props.atLeave);
  };

  didLeave = (styleThatLeft: TransitionStyle) => {
    if (this.props.didLeave) {
      this.props.didLeave(styleThatLeft);
    }
  };

  renderRoute = (config: TransitionPlainStyle) => {
    const props = {
      // this.props.mapStyles has a default value for the prop
      style: this.props.mapStyles!(config.style),
      key: config.key
    };

    return this.props.wrapperComponent !== false && typeof this.props.wrapperComponent !== 'boolean'
      ? // this.props.wrapperComponent has a default value for the prop
        React.createElement(this.props.wrapperComponent!, props, config.data)
      : React.cloneElement(config.data, props);
  };

  renderRoutes = (interpolatedStyles: Array<TransitionPlainStyle>) => {
    return <div className={this.props.className}>{interpolatedStyles.map(this.renderRoute)}</div>;
  };

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        didLeave={this.didLeave}
      >
        {this.renderRoutes}
      </TransitionMotion>
    );
  }
}

export default RouteTransition;
