import React from 'react';

import Calculator from './Calculator';
import HowTo from './HowTo';
import style from '../../styles/components/home/index.scss';

const HomeComponent = props => {
  return (
    <div className={style.container}>
      <HowTo />
      <div className={style.separator} />
      <Calculator />
    </div>
  );
};

export default HomeComponent;
