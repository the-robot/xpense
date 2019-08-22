import React from 'react';
import PropTypes from 'prop-types';

// styling
import style from '../../styles/components/common/card.scss';

// variables
import variables from '../../styles/index.scss';

const Card = props => {
  const { backgroundColor } = props;

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <h1> Hello World </h1>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,

  backgroundColor: PropTypes.string,
};

Card.defaultProps = {
  backgroundColor: variables.red1
};

export default Card;