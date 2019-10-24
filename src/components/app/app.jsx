import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {questionType} from '../../mocks/questions';
import Welcome from '../welcome/welcome';
import GameArtist from '../game-artist/game-artist';
import GameGenre from '../game-genre/game-genre';

class App extends PureComponent {
  static getScreen(questionOrder, props, onUserAnswer) {
    if (questionOrder !== -1) {
      const {questions} = props;
      const currentQuestion = questions[questionOrder];

      switch (currentQuestion.type) {
        case `genre`: return <GameGenre
          screenIndex={questionOrder}
          question={currentQuestion}
          onAnswer={onUserAnswer}
        />;

        case `artist`: return <GameArtist
          screenIndex={questionOrder}
          question={currentQuestion}
          onAnswer={onUserAnswer}
        />;
      }
    }

    const {
      gameTime,
      errorCount,
    } = props;

    return <Welcome
      gameTime={gameTime}
      availableMistakes={errorCount}
      onStart={onUserAnswer}
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

    const {
      // gameTime,
      // errorCount,
      questions,
    } = this.props;
    const {questionOrder} = this.state;

    return App.getScreen(questionOrder, this.props, (answers) => {
      this.setState((prevState) => {
        const nextIndex = prevState.questionOrder + 1;
        const isEnd = nextIndex >= questions.length;

        return {
          ...prevState,
          questionOrder: !isEnd ? nextIndex : -1,
          answers: [...prevState.answers, answers]
        };
      });
    });
  }
}

App.propTypes = {
  questions: PropTypes.arrayOf(questionType),
  gameTime: PropTypes.number,
  errorCount: PropTypes.number
};

export default App;
