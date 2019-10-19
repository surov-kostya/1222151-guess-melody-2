import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Welcome from './welcome';

Enzyme.configure({adapter: new Adapter()});

it(`Should emit event by click`, () => {
  const clickHandler = jest.fn();
  const welcome = shallow(<Welcome
    gameTime={7}
    availableMistakes={4}
    onStart={clickHandler}
  />);

  const startBtn = welcome.find(`.welcome__button`);
  startBtn.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
