import React, {PureComponent} from 'react';
import AudioPlayer from '../audio-player/audio-player';
import PropTypes from 'prop-types';
import {questionType} from '../../mocks/questions';

class GameGenre extends PureComponent {
  constructor(props) {
    super(props);

    this._answerHelper = this._answerHelper.bind(this);
    this._playClickHandler = this._playClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);

    this.state = {
      answers: props.question.answers,
      genre: props.question.genre,
      chosenAnswers: [],
      activePlayer: -1
    };
  }

  render() {
    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          {this.props.children}
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {this.state.genre} треки</h2>
          <form className="game__tracks" onSubmit={(evt) => {
            evt.preventDefault();
            this._submitHandler();
          }}>
            {this.state.answers.map((item, i) => {
              return (
                <div key={item.id} className="track">
                  <AudioPlayer
                    src={item.src}
                    isPlaying={i === this.state.activePlayer}
                    onPlayButtonClick={() => this._playClickHandler(i)} />
                  <div className="game__answer">
                    <input
                      onChange={(event) => this._answerHelper(item, event.target.checked, i)}
                      className="game__input visually-hidden"
                      type="checkbox" name={`answer-${i}`}
                      value={`answer-${i}`}
                      id={`answer-${i}`} />
                    <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                  </div>
                </div>
              );
            })}
            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }

  componentDidUpdate() {
    this.setState({
      answers: this.props.question.answers,
      genre: this.props.question.genre,
    });
  }

  _answerHelper(answer, checked, index) {
    this.setState((prevState) => {
      const tmpChoosenAnswers = prevState.chosenAnswers.slice();
      if (checked) {
        tmpChoosenAnswers[index] = answer;
      } else {
        delete tmpChoosenAnswers[index];
      }

      return {chosenAnswers: tmpChoosenAnswers};
    });
  }

  _playClickHandler(playerIndex) {
    this.setState((prevState) => (
      {activePlayer: prevState.activePlayer !== playerIndex ? playerIndex : -1}
    ));
  }

  _submitHandler() {
    this.props.onAnswer(this.state.chosenAnswers.filter((item) => item));
    this.setState({chosenAnswers: [], activePlayer: -1});
  }
}

GameGenre.propTypes = {
  question: questionType,
  onAnswer: PropTypes.func,
  children: PropTypes.node
};

export default GameGenre;
