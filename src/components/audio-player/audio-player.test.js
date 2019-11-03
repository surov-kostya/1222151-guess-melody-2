import React from 'react';
import AudioPlayer from './audio-player';
import renderer from 'react-test-renderer';

it(`AudioPlayer renders correctly`, () => {
  const tree = renderer.create(
      <AudioPlayer
        src={`https://www.youtube.com/audiolibrary_download?vid=3b32fa1674bc3764`}
        isPlaying={true}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
