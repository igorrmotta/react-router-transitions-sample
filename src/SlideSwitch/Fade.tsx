import * as React from 'react';
import Transition from 'react-transition-group/Transition';
import { reflow, TransitionInjectedProps, TransitionProps } from './utils';

type FadeOwnProps = {
  delay?: string;
  timeout?: number;
  'data-id'?: string;
};
type Props = TransitionProps & FadeOwnProps;

class Fade extends React.Component<Props> {
  handleEnter = (node: HTMLElement) => {
    reflow(node); // So the animation always start from the start.

    node.style.webkitTransition = !!this.props.delay
      ? `opacity 0.15s linear ${this.props.delay}`
      : 'opacity 0.15s linear';
    node.style.transition = !!this.props.delay
      ? `opacity 0.15s linear ${this.props.delay}`
      : 'opacity 0.15s linear';

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleExit = (node?: HTMLElement) => {
    if (!node) {
      return;
    }

    node.style.webkitTransition = 'opacity 0.15s sharp';
    node.style.transition = 'opacity 0.15s sharp';

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const { children, style: styleProp } = this.props;

    const propStyle = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {})
    };

    return (
      <Transition
        appear={true}
        in={this.props.in}
        timeout={this.props.timeout || 150}
        mountOnEnter={true}
        unmountOnExit={true}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        onEntered={this.props.onEntered}
        onExited={this.props.onExited}
      >
        {status => {
          const style: React.CSSProperties = {
            opacity: 0,
            willChange: 'opacity',
            ...propStyle
          };

          if (status === 'entered' || status === 'entering') {
            style.opacity = 1;
          }

          return React.cloneElement<TransitionInjectedProps>(children || <div />, {
            style,
            'data-id': this.props['data-id']
          } as any);
        }}
      </Transition>
    );
  }
}

export default Fade;
