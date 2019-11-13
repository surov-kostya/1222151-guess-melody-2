const initialState = {
  step: -1,
  mistakes: 0
};

export const ActionType = {
  INC_STEP: `INC_STEP`,
  INC_MISTAKES: `INC_MISTAKES`,
  RESET: `RESET`
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INC_STEP:
      return Object.assign({}, state, {step: state.step + action.payload});
    case ActionType.INC_MISTAKES:
      return Object.assign({}, state, {mistakes: state.mistakes + action.payload});
    case ActionType.RESET:
      return Object.assign({}, initialState);
  }

  return state;
};

export const ActionCreator = {
  incStep: () => {
    return {
      type: ActionType.INC_STEP,
      payload: 1
    };
  },

  incMistakes: (userAnswer, question, mistakes, maxMistakes, stepsToEnd) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: ActionType.RESET
      };
    }

    if (stepsToEnd === 0) {
      return {
        type: ActionType.RESET
      };
    }

    return {
      type: ActionType.INC_MISTAKES,
      payload: answerIsCorrect ? 0 : 1
    };
  }
};

export const isArtistAnswerCorrect = (userAnswer, question) => {
  const rightAnswerId = question.answers
    .find((answer) => answer.artist === question.song.artist).id;

  return userAnswer[0].id === rightAnswerId;
};

export const isGenreAnswerCorrect = (userAnswer, question) => {
  const rightAnswersIds = question.answers
    .filter((answer) => answer.genre === question.genre)
    .map((answer) => answer.id);

  if (rightAnswersIds.length !== userAnswer.length) {
    return false;
  }

  for (const answer of userAnswer) {
    if (!rightAnswersIds.includes(answer.id)) {
      return false;
    }
  }

  return true;
};


