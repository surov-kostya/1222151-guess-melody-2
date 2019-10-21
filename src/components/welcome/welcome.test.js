import React from 'react';
import Welcome from './welcome';
import renderer from 'react-test-renderer';

it(`Welcome renders correctly`, () => {
  const tree = renderer
    .create(<Welcome gameTime={7} availableMistakes={7}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
