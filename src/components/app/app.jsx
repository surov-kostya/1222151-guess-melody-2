import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {questionType} from '../../mocks/questions';

import {ActionCreator} from '../../reducer';
import Welcome from '../welcome/welcome';
import GameArtist from '../game-artist/game-artist';
import GameGenre from '../game-genre/game-genre';
import MistakesCounter from '../mistakes-counter/mistakes-counter';
import Timer from '../timer/timer';
import GameOver from '../game-over/game-over';

class App extends PureComponent {
  static getScreen(props) {
    const {
      gameTime,
      errorCount,
      onWelcomeScreenClick,
      step,
      questions,
      isGameOver,
      onRestart
    } = props;

    if (isGameOver) {
      return (
        <GameOver onRestart={onRestart} />
      );
    }

    if (step !== -1) {
      const {mistakes, onUserAnswer, onTimeout, onTick} = props;
      const currentQuestion = questions[step];
      const stepsToEnd = questions.length - step - 1;

      switch (currentQuestion.type) {
        case `genre`: return <GameGenre
          question={currentQuestion}
          onAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, errorCount, stepsToEnd)}
        >
          <Timer time={gameTime} onTimeout={onTimeout} onTick={(time) => onTick(time)}/>
          <MistakesCounter mistakes={mistakes}/>
        </GameGenre>;

        case `artist`: return <GameArtist
          screenIndex={step}
          question={currentQuestion}
          onAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, errorCount, stepsToEnd)}
        >
          <Timer time={gameTime} onTimeout={onTimeout} onTick={(time) => onTick(time)}/>
          <MistakesCounter mistakes={mistakes}/>
        </GameArtist>;
      }
    }

    return <Welcome
      gameTime={gameTime}
      availableMistakes={errorCount}
      onStart={onWelcomeScreenClick}
    />;
  }

  constructor(props) {
    super(props);

    this.state = {
      step: -1,
      answers: []
    };
  }

  render() {
    return App.getScreen(this.props);
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(questionType),
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired,
  onTick: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  gameTime: state.gameTime,
  isGameOver: state.isGameOver
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, stepsToEnd) => {
    dispatch(ActionCreator.incStep());
    dispatch(ActionCreator.incMistakes(userAnswer, question, mistakes, maxMistakes, stepsToEnd));
  },
  onTimeout: () => dispatch(ActionCreator.gameOver()),
  onTick: (time) => dispatch(ActionCreator.decGameTime(time)),
  onRestart: () => dispatch(ActionCreator.reset())
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
