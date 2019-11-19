import React from 'react';
import renderer from 'react-test-renderer';
import GameOver from './game-over';

it(`GameGenre renders correctly`, () => {
  const tree = renderer.create(<GameOver onRestart={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});
