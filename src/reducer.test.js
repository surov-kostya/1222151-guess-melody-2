import {
  ActionCreator,
  ActionType,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer
} from "./reducer";
import {gameQuestions} from './mocks/questions';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect([gameQuestions[2].answers[0]], gameQuestions[2])).toBe(true);
    expect(isArtistAnswerCorrect([gameQuestions[2].answers[1]], gameQuestions[2])).toBe(false);
  });
});

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isGenreAnswerCorrect([gameQuestions[0].answers[0]], gameQuestions[0])).toBe(true);
    expect(isGenreAnswerCorrect([gameQuestions[0].answers[1]], gameQuestions[0])).toBe(false);
  });
});


describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incStep()).toEqual({
      type: ActionType.INC_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incMistakes([gameQuestions[2].answers[0]], gameQuestions[2], 1, 3, 1)).toEqual({
      type: ActionType.INC_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incMistakes([gameQuestions[2].answers[1]], gameQuestions[2], 1, 3, 1)).toEqual({
      type: ActionType.INC_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incMistakes([gameQuestions[0].answers[0]], gameQuestions[0], 1, 3, 1)).toEqual({
      type: ActionType.INC_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incMistakes([gameQuestions[0].answers[1]], gameQuestions[0], 1, 3, 1)).toEqual({
      type: ActionType.INC_MISTAKES,
      payload: 1,
    });
  });
});


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    }, {
      type: ActionType.INC_STEP,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    }, {
      type: ActionType.INC_STEP,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    });
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    }, {
      type: ActionType.INC_MISTAKES,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
      gameTime: 5,
      isGameOver: false
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    }, {
      type: ActionType.INC_MISTAKES,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 1000000,
      mistakes: 12309,
      gameTime: 5,
      isGameOver: false
    }, {
      type: ActionType.RESET,
    })).toEqual({
      step: -1,
      mistakes: 0,
      gameTime: 5,
      isGameOver: false
    });
  });
});
