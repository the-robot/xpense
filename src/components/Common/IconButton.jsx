import React from 'react';
import PropTypes from 'prop-types';

// styling
import style from '../../styles/components/common/iconButton.scss';

const IconButton = props => {
  const { buttonStyle, callback, icon } = props;
  return (
    <div className={`${style.button} ${buttonStyle}`} onClick={callback}>
      {icon}
    </div>
  );
};

IconButton.propTypes = {
  callback: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  buttonStyle: PropTypes.string,
};

IconButton.defaultProps = {
  buttonStyle: '',
};

export default IconButton;