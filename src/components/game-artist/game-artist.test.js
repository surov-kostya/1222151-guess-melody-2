import React from 'react';
import renderer from 'react-test-renderer';
import {gameQuestions} from '../../mocks/questions';
import GameArtist from './game-artist';

it(`GameArtist renders correctly`, () => {
  const tree = renderer.create(<GameArtist question={gameQuestions[2]} screenIndex={2} onAnswer={() => { }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
