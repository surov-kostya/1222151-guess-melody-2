const initialState = {
  step: -1,
  mistakes: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INC_STEP`:
      return Object.assign({}, state, {step: state.step + action.payload});
    case `INC_MISTAKES`:
      return Object.assign({}, state, {mistakes: state.mistakes + action.payload});
    case `RESET`:
      return Object.assign({}, state, initialState);
  }

  return undefined;
};

export const actionCreator = {
  incStep: () => ({
    type: `INC_STEP`,
    payload: 1
  }),

  incMistakes: (userAnswer, question, mistakes, maxMistakes) => {
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
        type: `RESET`
      };
    }

    return {
      type: `INC_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1
    };
  }
};

const isArtistAnswerCorrect = (userAnswer, question) => {
  const rightAnswerId = question.answers
    .find((answer) => answer.artist === question.song.artist).id;

  if (userAnswer[0].id !== rightAnswerId) {
    return false;
  }

  return true;
};

const isGenreAnswerCorrect = (userAnswer, question) => {
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
