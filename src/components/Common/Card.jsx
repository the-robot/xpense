import React from 'react';
import PropTypes from 'prop-types';

// styling
import style from '../../styles/components/common/card.scss';

const Card = props => {
  const { backgroundColor, icon, message, title } = props;
  const defaultContainerStyle = backgroundColor ? {
    backgroundColor: backgroundColor,
  } : {};

  return (
    <div className={style.container} style={defaultContainerStyle}>
      <p className={style.title}>{title}</p>
      {message
        ? (
          <p className={style.message}>{message}</p>
        ) : null}
      {icon}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,

  backgroundColor: PropTypes.string,
  icon: PropTypes.element,
  message: PropTypes.string,
};

Card.defaultProps = {
  backgroundColor: null
};

export default Card;