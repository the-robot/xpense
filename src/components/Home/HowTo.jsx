import React from 'react';

import { Card } from '../Common';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faDollarSign, faBiking } from '@fortawesome/free-solid-svg-icons';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home/index.scss';

// colors
import variables from '../../styles/index.scss';

const HowTo = props => {
  return (
    <div className={style.howto}>
      {/* How To */}
      <div className={style.title}>
        <p className={style.title_text}>How To</p>
      </div>
      <div className={`${grid.container} ${style.container_grid}`}>
        <div className={grid.row}>
          <div className={grid.col_sm}>
            <Card
              title={"Item's Price"}
              backgroundColor={variables['colors-pink1']}
              icon={
                <FontAwesomeIcon
                  className={style.icon_dollar}
                  icon={faDollarSign}
                />
              }
            />
          </div>

          <div className={grid.col_sm}>
            <Card
              title={'Delivery / Promo'}
              backgroundColor={variables['colors-yellow2']}
              icon={
                <FontAwesomeIcon
                  className={style.icon_delivery}
                  icon={faBiking}
                />
              }
            />
          </div>

          <div className={grid.col_sm}>
            <Card
              title={'Calculate'}
              backgroundColor={variables['colors-blue3']}
              icon={
                <FontAwesomeIcon
                  className={style.icon_calculate}
                  icon={faEquals}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
