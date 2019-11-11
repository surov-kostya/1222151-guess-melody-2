import React from 'react';
import PropTypes from 'prop-types';

const MistakesCounter = ({mistakes}) => {
  const mistakesArr = Array.fill(<div className="wrong"></div>, 0, mistakes - 1);
  return (
    <div className="game__mistakes">
      {mistakesArr}
    </div>
  );
};

MistakesCounter.propTypes = {
  mistakes: PropTypes.number
};

export default MistakesCounter;
