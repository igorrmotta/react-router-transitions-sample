import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { Slider, SlideFromType } from './Slider';
import { History } from 'history';

type ChildrenType = React.ReactElement<any, string>;

type SlideOutProps = {
  children: ChildrenType;
  uniqKey: string;
  history: History;
};
type State = {
  currChildPosition: SlideFromType;
  curChild: ChildrenType;
  curUniqId: string;

  prevChildPosition: SlideFromType;
  prevChild: ChildrenType | null;
  prevUniqId: string | null;
};

class SlideOut extends React.Component<SlideOutProps, State> {
  constructor(props: SlideOutProps) {
    super(props);

    this.state = {
      currChildPosition: 'CENTER',
      curChild: props.children,
      curUniqId: props.uniqKey,

      prevChildPosition: 'CENTER',
      prevChild: null,
      prevUniqId: null
    };
  }

  componentDidUpdate(prevProps: SlideOutProps, prevState: State) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

    if (prevUniqId !== uniqId) {
      const isBack = this.props.history.action === 'POP';
      if (isBack) {
        this.setState({
          currChildPosition: 'TO_RIGHT',
          curChild: prevProps.children,
          curUniqId: prevUniqId,

          prevChildPosition: 'CENTER',
          prevChild: this.props.children,
          prevUniqId: uniqId
        });
      } else {
        this.setState({
          currChildPosition: 'FROM_RIGHT',
          curChild: this.props.children,
          curUniqId: uniqId,

          prevChildPosition: 'CENTER',
          prevChild: prevProps.children,
          prevUniqId
        });
      }
    }
  }

  prevChildAnimationCallback = () => {
    this.setState({
      prevChild: null,
      prevUniqId: null,
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
      <div className="slide-container">
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

const animateSwitch = (
  CustomSwitch: React.ComponentType<SwitchProps>,
  AnimatorComponent: React.ComponentType<SlideOutProps>
) => (props: { children: any }) => (
  <Route
    render={({ location, history }) => (
      <AnimatorComponent uniqKey={location.pathname} history={history}>
        <CustomSwitch location={location}>{props.children}</CustomSwitch>
      </AnimatorComponent>
    )}
  />
);

const SwitchWithSlide = animateSwitch(Switch, SlideOut);

export { SwitchWithSlide };
