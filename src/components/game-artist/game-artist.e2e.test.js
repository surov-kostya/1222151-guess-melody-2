import React from 'react';
import GameArtist from './game-artist';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const mockAnswers = [{
  id: 101,
  picture: `http://placehold.it/134x134`,
  artist: `John Snow`,
}];

const mockQuestion = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
  },
  answers: mockAnswers
};

it(`Should transmit correct data on answer`, () => {
  const clickHandler = jest.fn();
  const gameArtist = shallow(<GameArtist question={mockQuestion} screenIndex={0} onAnswer={clickHandler}/>);
  const radios = gameArtist.find(`input.artist__input`);
  radios.forEach((item) => {
    item.simulate(`change`);
  });
  expect(clickHandler).toBeCalledWith(mockAnswers);
});
