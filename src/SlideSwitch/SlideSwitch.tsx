import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Slider, SlideFromType } from './Slider';

type ChildrenType = React.ReactElement<any, string>;

type Props = {
  children: ChildrenType;
  uniqKey: string;
};
type State = {
  childPosition: SlideFromType;

  curChild: ChildrenType;
  curUniqId: string;
  prevChild: ChildrenType | null;
  prevUniqId: string | null;

  animationCallback: (() => void) | null;
};

class SlideOut extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log('constructor');

    this.state = {
      childPosition: 'CENTER',
      curChild: props.children,
      curUniqId: props.uniqKey,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

    if (prevUniqId !== uniqId) {
      console.log(
        '(componentDidUpdate)',
        'Uniq ID has changed!',
        `It was ${prevUniqId}, but is now ${uniqId}`,
        'Begin sliding TO_LEFT, but set `prevChild` so we keep rendering the old page!'
      );

      this.setState({
        // childPosition: 'TO_LEFT',
        curChild: this.props.children,
        curUniqId: uniqId,
        prevChild: prevProps.children,
        prevUniqId,
        animationCallback: this.swapChildren
      });
    }
  }

  swapChildren = () => {
    console.log(
      '(swapChildren)',
      'TO_LEFT animation has completed!',
      'Remove `prevChild` so our new child is rendered',
      'Start animating FROM_RIGHT'
    );

    this.setState({
      childPosition: 'FROM_RIGHT',
      prevChild: null,
      prevUniqId: null,
      animationCallback: () => {
        console.log('All done!');
        this.setState({ animationCallback: null });
      }
    });
  };

  render() {
    return (
      <Slider position={this.state.childPosition} animationCallback={this.state.animationCallback}>
        {this.state.prevChild || this.state.curChild}
      </Slider>
    );
  }
}

const animateSwitch = (CustomSwitch: any, AnimatorComponent: any) => (props: { children: any }) => (
  <Route
    render={({ location }) => (
      <AnimatorComponent uniqKey={location.pathname}>
        <CustomSwitch location={location}>{props.children}</CustomSwitch>
      </AnimatorComponent>
    )}
  />
);

const SwitchWithSlide = animateSwitch(Switch, SlideOut);

export { SwitchWithSlide };
