import React from 'react';
import MistakesCounter from './mistakes-counter';
import renderer from 'react-test-renderer';

it(`MistakesCouner renders correctly`, () => {
  const tree = renderer.create(<MistakesCounter mistakes={2}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
