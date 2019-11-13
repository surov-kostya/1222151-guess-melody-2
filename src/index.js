import {Provider} from 'react-redux';
import {createStore} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {settings, gameQuestions} from './mocks/questions';
import {reducer} from './reducer';

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <App
      errorCount={settings.errorCount}
      gameTime={settings.gameTime}
      questions={gameQuestions}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
