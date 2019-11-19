import React from 'react';
import renderer from 'react-test-renderer';
import Timer from './timer';

it(`Timer renders correctly`, () => {
  const tree = renderer.create(<Timer time={5} onTimeout={() => {}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
