import React from 'react';
import renderer from 'react-test-renderer';
import {gameQuestions} from '../../mocks/questions';
import GameGenre from './game-genre';

it(`GameGenre renders correctly`, () => {
  const tree = renderer.create(<GameGenre question={gameQuestions[0]} screenIndex={0} onAnswer={() => {}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
