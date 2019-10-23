import React from 'react';
import GameGenre from './game-genre';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {gameQuestions} from '../../mocks/questions';

Enzyme.configure({adapter: new Adapter()});

it(`Should transmit correct data on answer`, () => {
  const clickHandler = jest.fn();
  const gameGenre = shallow(<GameGenre question={gameQuestions[0]} screenIndex={0} onAnswer={clickHandler}/>);
  const form = gameGenre.find(`form.game__tracks`);
  form.simulate(`submit`, {preventDefault: () => {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
