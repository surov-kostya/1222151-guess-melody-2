import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: false
    };

    this._audioRef = React.createRef();
    this._eventListenerCallback = this._eventListenerCallback.bind(this);
  }

  render() {
    return (
      <>
        <button
          style={{outline: `none`}}
          className={`track__button track__button--${this.state.isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={this.state.isLoading}
          onClick={this.props.onPlayButtonClick}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </>
    );
  }

  componentDidMount() {
    const audio = this._audioRef.current;
    if (audio) {
      audio.src = this.props.src;

      audio.addEventListener(`canplaythrough`, this._eventListenerCallback);
      audio.addEventListener(`timeupdate`, this._eventListenerCallback);
    }
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    this.setState({isPlaying: this.props.isPlaying});
    if (audio && this.props.isPlaying) {
      audio.play();
    } else if (audio && !this.props.isPlaying) {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.removeEventListener(`canplaythrough`, this._eventListenerCallback);
    audio.removeEventListener(`timeupdate`, this._eventListenerCallback);
  }

  _eventListenerCallback(event) {
    const audio = this._audioRef.current;

    switch (event.type) {
      case `canplaythrough`:
        this.setState({isLoading: false});
        break;
      case `timeupdate`:
        this.setState({progress: audio.currentTime});
        break;
      default:
        this.setState({
          progress: 0,
          isLoading: true,
          isPlaying: false
        });
    }
  }

}

AudioPlayer.propTypes = {
  src: PropTypes.string,
  onPlayButtonClick: PropTypes.func,
  isPlaying: PropTypes.bool,
};

export default AudioPlayer;

