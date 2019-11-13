import React from 'react';
import PropTypes from 'prop-types';

const MistakesCounter = ({mistakes}) => {
  const mistakesArr = Array.from(Array(mistakes), (_, i) => <div key={i} className="wrong"></div>);

  return (
    <div className="game__mistakes">
      {mistakesArr}
    </div>
  );
};

MistakesCounter.propTypes = {
  mistakes: PropTypes.number,
};

export default MistakesCounter;
