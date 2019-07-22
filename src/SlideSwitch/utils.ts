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
