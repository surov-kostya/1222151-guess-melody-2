import React from 'react';
import GameGenre from './game-genre';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const mockAnswers = [
  {
    id: 100,
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    genre: `rock`,
  },
  {
    id: 101,
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    genre: `pop`,
  },
  {
    id: 102,
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    genre: `jazz`,
  },
  {
    id: 103,
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
    genre: `rock`,
  },
];

const mockQuestion = {
  type: `genre`,
  genre: `rock`,
  answers: mockAnswers
};

it(`Should transmit correct data on answer`, () => {
  const clickHandler = jest.fn();
  const gameGenre = shallow(<GameGenre question={mockQuestion} screenIndex={0} onAnswer={clickHandler}/>);

  const inputs = gameGenre.find(`input.game__input`);
  inputs.forEach((input) => input.simulate(`change`, {target: {checked: true}}));

  const form = gameGenre.find(`form.game__tracks`);
  form.simulate(`submit`, {preventDefault: () => {}});
  expect(clickHandler).toBeCalledWith(mockAnswers);
});
