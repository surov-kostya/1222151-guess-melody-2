import React from 'react';
import {App} from './app';
import renderer from 'react-test-renderer';
import {gameQuestions} from '../../mocks/questions';

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App questions={gameQuestions} gameTime={7} errorCount={3}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
