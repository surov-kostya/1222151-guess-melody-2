import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './timer';

Enzyme.configure({adapter: new Adapter()});

describe(`Test Timer component`, () => {
  const timeoutHandler = jest.fn();
  const time = 2;
  const timer = shallow(<Timer time={time} onTimeout={timeoutHandler} onTick={() => {}} />);
  const instance = timer.instance();

  it(`Time should decrease on run tick function`, () => {
    expect(timer.state(`gameTime`)).toBe(2);
    instance._tick();
    expect(timer.state(`gameTime`)).toBe(1);
  });
  it(`Run callback on timeout`, () => {
    instance._tick();
    instance._tick();
    expect(timeoutHandler).toHaveBeenCalled();
  });
});
