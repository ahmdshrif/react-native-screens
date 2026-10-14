import React from 'react';
import { StyleSheet, View } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { NativeScreen } from '../Screen.web';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

function renderScreen(element: React.ReactElement) {
  let tree: renderer.ReactTestRenderer | undefined;
  act(() => {
    tree = renderer.create(element);
  });
  return tree!.root.findByType(View);
}

describe('Screen (web)', () => {
  it('passes style through when enabled', () => {
    const view = renderScreen(
      <NativeScreen enabled activityState={2} style={style} />,
    );

    expect(StyleSheet.flatten(view.props.style)).toEqual({
      ...style,
      display: 'flex',
    });
  });

  it('passes style through when disabled', () => {
    const view = renderScreen(<NativeScreen enabled={false} style={style} />);

    expect(StyleSheet.flatten(view.props.style)).toEqual(style);
  });
});
