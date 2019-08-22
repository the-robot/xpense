import React, { PureComponent } from 'react';

import { Card } from '../Common';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home.scss';

class HomeComponent extends PureComponent {
  render() {
    return (
      <div className={style.container}>
        {/* Grid Container */}
        <div className={grid.container}>
          <div className={grid.row}>
            <div className={grid.col_sm}>
              <Card />
            </div>

            <div className={grid.col_sm}>
              <Card />
            </div>

            <div className={grid.col_fill}>
              <Card />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
