import React from 'react';

// styling
import style from '../../styles/components/header.scss';

const Header = () => {
  return (
    <React.Fragment>
      <div className={style.container}>
        <div className={style.title}>
          <p className={style.title_name}>
            <font className={style.title_highlight}>X</font>pense </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;