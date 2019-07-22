import React from 'react';
import classNames from 'classnames';
import './Slider.css';

export type SlideFromType = 'CENTER' | 'TO_LEFT' | 'TO_RIGHT' | 'FROM_LEFT' | 'FROM_RIGHT';

type Props = {
  position: SlideFromType;
  className?: string;
  animationCallback: (() => void) | null;
};
type State = {
  animating: boolean;
  position: SlideFromType;
  animatePrepare: boolean;
};

class Slider extends React.Component<Props, State> {
  _postPrepareTimeout: NodeJS.Timeout | null;
  _animationTimeout: NodeJS.Timeout | null;
  node: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      animating: false,
      position: 'CENTER',
      animatePrepare: false
    };

    this._postPrepareTimeout = null;
    this._animationTimeout = null;
    this.node = null;

    this.startAnimation = this.startAnimation.bind(this);
    this.postPrepareAnimation = this.postPrepareAnimation.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.startAnimation(this.props.position);
    if (this.node) {
      this.node.addEventListener('transitionend', this.onTransitionEnd);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('transitionend', this.onTransitionEnd);
    }

    if (this._postPrepareTimeout) {
      clearTimeout(this._postPrepareTimeout);
    }

    if (this._animationTimeout) {
      clearTimeout(this._animationTimeout);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.position !== this.props.position) {
      this.startAnimation(newProps.position);
    }
  }

  startAnimation(position: SlideFromType) {
    const noAnimate = position === 'CENTER';
    const animatingOut = ['TO_LEFT', 'TO_RIGHT'].includes(position);
    const currentlyIn = ['CENTER', 'FROM_LEFT', 'FROM_RIGHT'].includes(this.state.position);

    if (noAnimate || (currentlyIn && animatingOut)) {
      // in these cases we don't need to prepare our animation at all, we can just
      // run straight into it
      return this.setState({
        animatePrepare: false,
        position
      });
    }

    // in case the transition fails, we also post-prepare after some ms (whichever
    // runs first should cancel the other)
    this._postPrepareTimeout = setTimeout(this.postPrepareAnimation, 500);

    this.setState({
      animating: true,
      animatePrepare: true,
      position
    });
  }

  postPrepareAnimation() {
    if (this._postPrepareTimeout) {
      clearTimeout(this._postPrepareTimeout);
    }

    this.setState({ animatePrepare: false });
  }

  onTransitionEnd(e: TransitionEvent) {
    // the Slider transitions the `transform` property. Any other transitions
    // that occur on the element we can just ignore.
    if (e.propertyName !== 'transform') {
      return;
    }

    // an animation callback is another animation, so we only set `animating` to
    // `false` when we finish the follow-up animation
    if (this.props.animationCallback) {
      this._animationTimeout = setTimeout(this.props.animationCallback, 0);
    } else {
      this.setState({ animating: false });
    }
  }

  render() {
    return (
      <div
        ref={node => (this.node = node)}
        className={classNames('animatable', {
          to: ['TO_LEFT', 'TO_RIGHT'].includes(this.state.position),
          from: ['FROM_LEFT', 'FROM_RIGHT'].includes(this.state.position),
          right: ['TO_RIGHT', 'FROM_RIGHT'].includes(this.state.position),
          left: ['TO_LEFT', 'FROM_LEFT'].includes(this.state.position),
          prepare: this.state.animatePrepare
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export { Slider };
