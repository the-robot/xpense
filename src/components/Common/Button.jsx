import React from 'react';
import PropTypes from 'prop-types';

// styling
import style from '../../styles/components/common/button.scss';

const Button = props => {
  const { buttonStyle, callback, text } = props;
  return (
    <div className={`${style.button} ${buttonStyle}`} onClick={callback}>
      <p>{text}</p>
    </div>
  );
};

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
};

Button.defaultProps = {
  buttonStyle: '',
};

export default Button;