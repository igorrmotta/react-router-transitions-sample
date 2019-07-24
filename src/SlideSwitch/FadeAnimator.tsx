import * as React from 'react';
import { AnimatorProps, AnimatorChildrenType } from './SlideSwitch';
import Fade from './Fade';
import { shouldAnimate } from './utils';

type Step = (...args: any[]) => StateItem;
const steps: Array<Step> = [
  (curChildren: AnimatorChildrenType, state: State) => ({
    ...state,
    curFadeIn: true,
    curChild: curChildren,
    nextFadeIn: false,
    nextChild: null
  }),
  (nextChildren: AnimatorChildrenType, state: State) => ({
    ...state,
    curFadeIn: false,

    nextFadeIn: true,
    nextChild: nextChildren
  })
];

type StateItem = {
  curChild: AnimatorChildrenType;
  curFadeIn: boolean | undefined;

  nextFadeIn: boolean | undefined;
  nextChild: AnimatorChildrenType | null;
};

type State = { uniqId: string } & StateItem;

class FadeAnimator extends React.Component<AnimatorProps, State> {
  constructor(props: AnimatorProps) {
    super(props);

    this.state = {
      uniqId: props.uniqKey,

      ...steps[0](props.children, this.state)
    };
  }

  componentWillReceiveProps(nextProps: AnimatorProps) {
    const uniqId = this.props.uniqKey || this.props.children.type;
    const nextUniqId = nextProps.uniqKey || nextProps.children.type;

    if (!shouldAnimate('fade', nextUniqId, nextProps.children)) {
      return;
    }

    console.log('this.props', this.props);
    console.log('nextProps >>> ', nextProps);

    if (uniqId !== nextUniqId) {
      this.setState({
        uniqId: uniqId,

        ...steps[1](nextProps.children, this.state)
      });
    }
  }

  onNextEntered = () => {
    if (!this.state.nextChild) {
      return;
    }

    this.setState({
      ...steps[0](this.state.nextChild, this.state)
    });
  };

  render() {
    return (
      <div className="animator-container">
        <Fade in={this.state.curFadeIn} delay={'0.5s'} timeout={500} data-id="current">
          <div>{this.state.curChild}</div>
        </Fade>

        <Fade in={this.state.nextFadeIn} onEntered={this.onNextEntered} data-id="next">
          <div>{this.state.nextChild}</div>
        </Fade>
      </div>
    );
  }
}

export { FadeAnimator };
