import * as React from 'react';
import { SlideFromType, Slider } from './Slider';
import { AnimatorChildrenType, AnimatorProps } from './SlideSwitch';

type State = {
  uniqId: string;

  currChildPosition: SlideFromType;
  curChild: AnimatorChildrenType;

  prevChildPosition: SlideFromType;
  prevChild: AnimatorChildrenType | null;
};

class SlideAnimator extends React.Component<AnimatorProps, State> {
  constructor(props: AnimatorProps) {
    super(props);

    const isBack = this.props.history.action === 'POP';
    console.warn('SlideAnimator.constructor', isBack);
    this.state = {
      uniqId: props.uniqKey,

      currChildPosition: isBack ? 'TO_RIGHT' : 'FROM_RIGHT',
      curChild: props.children,

      prevChildPosition: 'CENTER',
      prevChild: null
    };
  }

  componentDidUpdate(prevProps: AnimatorProps, prevState: State) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

    console.warn('SlideAnimator.componentDidUpdate >>> prevProps', prevProps);
    console.warn('SlideAnimator.componentDidUpdate >>> this.props', this.props);

    console.warn('SlideAnimator.componentDidUpdate >>> prevState', prevState);
    console.warn('SlideAnimator.componentDidUpdate >>> this.state', this.state);

    if (prevUniqId !== uniqId) {
      const isBack = this.props.history.action === 'POP';
      if (isBack) {
        this.setState({
          uniqId: prevUniqId,

          currChildPosition: 'TO_RIGHT',
          curChild: prevProps.children,

          prevChildPosition: 'CENTER',
          prevChild: this.props.children
        });
      } else {
        this.setState({
          uniqId: uniqId,

          currChildPosition: 'FROM_RIGHT',
          curChild: this.props.children,

          prevChildPosition: 'CENTER',
          prevChild: prevProps.children
        });
      }
    }
  }

  prevChildAnimationCallback = () => {
    console.warn('SlideAnimator.prevChildAnimationCallback');
    this.setState(
      {
        prevChild: null,
        prevChildPosition: 'CENTER'
      },
      () => {
        if (this.props.onDone) {
          this.props.onDone();
        }
      }
    );
  };

  currChildAnimationCallback = () => {
    console.warn('SlideAnimator.currChildAnimationCallback');
    const isBack = this.props.history.action === 'POP';
    if (!isBack) {
      this.setState(
        {
          currChildPosition: 'CENTER'
        },
        () => {
          if (this.props.onDone) {
            this.props.onDone();
          }
        }
      );
    }
  };

  render() {
    console.warn('SlideAnimator.render');
    return (
      <>
        <Slider
          position={this.state.prevChildPosition}
          animationCallback={this.prevChildAnimationCallback}
        >
          {this.state.prevChild}
        </Slider>

        <Slider
          position={this.state.currChildPosition}
          animationCallback={this.currChildAnimationCallback}
        >
          {this.state.curChild}
        </Slider>
      </>
    );
  }
}

export { SlideAnimator };
