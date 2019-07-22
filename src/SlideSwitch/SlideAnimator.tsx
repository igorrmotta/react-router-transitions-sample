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

    this.state = {
      uniqId: props.uniqKey,

      currChildPosition: 'CENTER',
      curChild: props.children,

      prevChildPosition: 'CENTER',
      prevChild: null
    };
  }

  componentDidUpdate(prevProps: AnimatorProps, prevState: State) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

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
    this.setState({
      prevChild: null,
      prevChildPosition: 'CENTER'
    });
  };

  currChildAnimationCallback = () => {
    const isBack = this.props.history.action === 'POP';
    if (!isBack) {
      this.setState({
        currChildPosition: 'CENTER'
      });
    }
  };

  render() {
    return (
      <div className="animator-container">
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
      </div>
    );
  }
}

export { SlideAnimator };
