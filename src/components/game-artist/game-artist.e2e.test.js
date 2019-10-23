import React from 'react';
import GameArtist from './game-artist';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {gameQuestions} from '../../mocks/questions';

Enzyme.configure({adapter: new Adapter()});

it(`Should transmit correct data on answer`, () => {
  const clickHandler = jest.fn();
  const gameArtist = shallow(<GameArtist question={gameQuestions[2]} screenIndex={2} onAnswer={clickHandler}/>);
  const form = gameArtist.find(`form.game__artist`);
  form.simulate(`change`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
