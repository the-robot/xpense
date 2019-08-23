import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Common';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home/result.scss';

/* 
{
  name: 'A',
  amount: '2.7'
},
 */

const Result = props => {
  const { goBack } = props;

  return (
    <div className={`${grid.container} ${style.container}`}>
      {/* Heading */}
      <div className={grid.row}>
        {/* Name */}
        <div className={`${grid.col_md} ${style.col}`}>
          <p className={style.title}>Expense Name</p>
        </div>

        {/* Amount */}
        <div className={`${grid.col_md} ${style.col}`}>
          <p className={style.title}>Amount</p>
        </div>
      </div>

      {/* Records */}

      {/* Footer */}
      <div className={grid.row}>
        <div className={`${grid.col_lg} ${style.col} ${style.container_mid}`}>
          <Button
            buttonStyle={style.button}
            callback={goBack}
            text={'Back'}
          />
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  goBack: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
};

export default Result;