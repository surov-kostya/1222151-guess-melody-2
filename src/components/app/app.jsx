import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {questionType} from '../../mocks/questions';
import Welcome from '../welcome/welcome';
import GameArtist from '../game-artist/game-artist';
import GameGenre from '../game-genre/game-genre';
import {actionCreator} from '../../reducer';
import MistakesCounter from '../mistakes-counter/mistakes-counter';

class App extends PureComponent {
  static getScreen(questionOrder, props) {
    if (questionOrder !== -1) {
      const {questions, errorCount, mistakes, onUserAnswer} = props; // чем отличается mistakes от errorCount?
      const currentQuestion = questions[questionOrder];

      switch (currentQuestion.type) {
        case `genre`: return <GameGenre
          screenIndex={questionOrder}
          question={currentQuestion}
          onAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, errorCount)}
        >
          <MistakesCounter mistakes={errorCount}/>
        </GameGenre>;

        case `artist`: return <GameArtist
          screenIndex={questionOrder}
          question={currentQuestion}
          onAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, errorCount)}
        >
          <MistakesCounter mistakes={errorCount}/>
        </GameArtist>;
      }
    }

    const {
      gameTime,
      errorCount,
    } = props;

    return <Welcome
      gameTime={gameTime}
      availableMistakes={errorCount}
      onStart={props.onWelcomeScreenClick}
    />;
  }

  constructor(props) {
    super(props);

    this.state = {
      questionOrder: -1,
      answers: []
    };
  }

  render() {
    const {questionOrder} = this.state;

    return App.getScreen(questionOrder, this.props);
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(questionType),
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(actionCreator.incStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(actionCreator.incStep());
    dispatch(actionCreator.incMistakes(userAnswer, question, mistakes, maxMistakes));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
