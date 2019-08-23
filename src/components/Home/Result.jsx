import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Common';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home/result.scss';

const Result = props => {
  const { goBack, expenses } = props;
  const expenseComponents = expenses.map((expense, index) => {
    let isTotal = index === expenses.length - 1;
    return (
      <div
        className={`${grid.row} ${isTotal ? style.row_noBorder : style.row}`}
        key={`${expense.name}-${index}`}
      >
        <div className={`${grid.col_md} ${style.col} ${style.col_name}`}>
          <p className={`${isTotal ? style.text_bold : style.text}`}>{expense.name}</p>
        </div>
        <div className={`${grid.col_md} ${style.col} ${style.col_amount}`}>
          <p className={`${isTotal ? style.text_bold : style.text}`}>{expense.amount}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={`${grid.container} ${style.container}`}>
      <div className={style.header}>
        <p className={style.header_text}>Expenses Breakdown</p>
      </div>

      {/* Records */}
      <div className={style.result}>
        {expenseComponents}
      </div>

      {/* Footer */}
      <div className={grid.row}>
        <div className={grid.col_lg}>
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
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ).isRequired,
};

export default Result;