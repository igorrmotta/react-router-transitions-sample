// Based on: https://github.com/maisano/react-router-transition.git

import { spring, Style } from 'react-motion';

export default function ensureSpring(styles: Style) {
  return Object.keys(styles).reduce(
    (acc, key) => {
      const value = styles[key];
      acc[key] = typeof value === 'number' ? spring(value) : value;
      return acc;
    },
    {} as Style
  );
}
