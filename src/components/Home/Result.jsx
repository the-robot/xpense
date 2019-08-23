import React from 'react';
import PropTypes from 'prop-types';

const Result = props => {
  return (
    <h1>Hello</h1>
  );
};

Result.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default Result;