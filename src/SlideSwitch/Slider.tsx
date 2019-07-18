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
  _animationCallback: Props['animationCallback'];
  _postPrepareTimeout: NodeJS.Timeout | null;
  node: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      animating: false,
      position: 'CENTER',
      animatePrepare: false
    };

    this._animationCallback = null;
    this._postPrepareTimeout = null;
    this.node = null;

    this.startAnimation = this.startAnimation.bind(this);
    this.postPrepareAnimation = this.postPrepareAnimation.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.startAnimation(this.props.position, null);
    if (this.node) {
      this.node.addEventListener('transitionend', this.onTransitionEnd);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('transitionend', this.onTransitionEnd);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.position !== this.props.position) {
      this.startAnimation(newProps.position, newProps.animationCallback);
    }
  }

  startAnimation(position: SlideFromType, animationCallback: Props['animationCallback']) {
    const noAnimate = position === 'CENTER';
    const animatingOut = ['TO_LEFT', 'TO_RIGHT'].includes(position);
    const currentlyIn = ['CENTER', 'FROM_LEFT', 'FROM_RIGHT'].includes(this.state.position);
    if (noAnimate || (currentlyIn && animatingOut)) {
      // in these cases we don't need to prepare our animation at all, we can just
      // run straight into it
      this._animationCallback = animationCallback;
      return this.setState({
        animatePrepare: false,
        position
      });
    }

    this._animationCallback = this.postPrepareAnimation;
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
    this._animationCallback = null;

    this.setState(
      { animatePrepare: false },
      () => (this._animationCallback = this.props.animationCallback)
    );
  }

  onTransitionEnd(e: TransitionEvent) {
    // the Slider transitions the `transform` property. Any other transitions
    // that occur on the element we can just ignore.
    if (e.propertyName !== 'transform') return;

    const callback = this._animationCallback;
    delete this._animationCallback;

    // an animation callback is another animation, so we only set `animating` to
    // `false` when we finish the follow-up animation
    if (callback) setTimeout(callback, 0);
    else this.setState({ animating: false });
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
        <div className={this.props.className}>{this.props.children}</div>
      </div>
    );
  }
}

export { Slider };
