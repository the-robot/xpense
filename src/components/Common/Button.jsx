import React from 'react';
import PropTypes from 'prop-types';

// styling
import style from '../../styles/components/common/button.scss';

const Button = props => {
  const { buttonStyle, callback, disabled, text } = props;
  return (
    <div
      className={`${style.button} ${buttonStyle} ${disabled ? style.button_disabled : ''}`}
      onClick={disabled ? () => {} : callback}
    >
      <p>{text}</p>
    </div>
  );
};

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  buttonStyle: '',
  disabled: false,
};

export default Button;