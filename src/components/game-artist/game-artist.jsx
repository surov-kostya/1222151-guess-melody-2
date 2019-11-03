import React, {PureComponent} from 'react';
import AudioPlayer from '../audio-player/audio-player';
import PropTypes from 'prop-types';
import {questionType} from '../../mocks/questions';

class GameArtist extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      answers: props.question.answers,
      songSrc: props.question.song.src,
      screenIndex: props.screenIndex
    };
  }

  render() {
    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer
                key={this.state.screenIndex}
                src={this.state.songSrc}
                isPlaying={this.state.isPlaying}
                onPlayButtonClick={
                  () => this.setState((prevState) => (
                    {isPlaying: !prevState.isPlaying}
                  ))} />
            </div>
          </div>

          <form className="game__artist">
            {
              this.state.answers.map((item) => (
                <div key={item.id} className="artist">
                  <input
                    onChange={() => {
                      this.setState({isPlaying: false});
                      this.props.onAnswer([item]);
                    }}
                    className="artist__input visually-hidden"
                    type="radio"
                    name="answer"
                    value={item.id}
                    id={item.id} />
                  <label className="artist__name" htmlFor={item.id}>
                    <img className="artist__picture" src={item.picture} alt={item.artist} />
                    {item.artist}
                  </label>
                </div>
              ))
            }
          </form>
        </section>
      </section>
    );
  }

  componentDidUpdate() {
    this.setState({
      answers: this.props.question.answers,
      songSrc: this.props.question.song.src,
      screenIndex: this.props.screenIndex
    });
  }
}

GameArtist.propTypes = {
  question: questionType,
  screenIndex: PropTypes.number,
  onAnswer: PropTypes.func
};

export default GameArtist;
