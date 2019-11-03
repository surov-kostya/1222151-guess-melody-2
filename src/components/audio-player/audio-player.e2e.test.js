import React from 'react';
import AudioPlayer from './audio-player';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe(`Play and pause toggle button change state`, () => {
  let isPlaying = false;
  const clickHandler = jest.fn().mockImplementation(() => {
    isPlaying = !isPlaying;
  });
  const props = {
    src: `https://www.youtube.com/audiolibrary_download?vid=3b32fa1674bc3764`,
    isPlaying,
    onPlayButtonClick: clickHandler
  };
  const audioPlayer = shallow(<AudioPlayer {...props} />);
  const playerBtn = audioPlayer.find(`button`);

  it(`Play and pause toggle button works correnctly`, () => {
    playerBtn.simulate(`click`);
    audioPlayer.setProps(Object.assign(props, {isPlaying}));
    expect(audioPlayer.state(`isPlaying`)).toBe(true);
  });

  it(`Pause toggle button works correnctly`, () => {
    playerBtn.simulate(`click`);
    audioPlayer.setProps(Object.assign(props, {isPlaying}));
    expect(audioPlayer.state(`isPlaying`)).toBe(false);
  });
});

