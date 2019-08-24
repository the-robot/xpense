import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, IconButton } from '../Common';
import Result from './Result';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home/index.scss';


class AmountInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      amount: props.amount,
    };
  }

  onNameChange = name => {
    const { setStateInParent } = this;
    this.setState({ name }, setStateInParent);
  };

  onAmountChange = amount => {
    const { setStateInParent } = this;
    let amt = amount && amount !== 0 ? parseFloat(amount, 10) : 0;
    if (amt <= 0) {
      amt = '';
    }
    this.setState({ amount: amt }, setStateInParent);
  };

  setStateInParent = () => {
    const { name, amount } = this.state;
    const { index, setBack } = this.props;
    setBack(index, name, amount);
  };

  render() {
    const { onNameChange, onAmountChange } = this;
    const { name, amount } = this.state;
    const { field1, field2 } = this.props;

    return (
      <div className={style.calculator_input}>
        <input
          className={style.calculator_input_left}
          onChange={evt => onNameChange(evt.target.value)}
          placeholder={field1.placeholder}
          type={field1.type}
          value={name}
        />
        <input
          className={style.calculator_input_right}
          onChange={evt => onAmountChange(evt.target.value)}
          placeholder={field2.placeholder}
          type={field2.type}
          value={amount}
        />
      </div>
    );
  }
}

AmountInput.propTypes = {
  index: PropTypes.number.isRequired,
  field1: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }).isRequired,
  field2: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }).isRequired,
  setBack: PropTypes.func.isRequired,

  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indvExpenses: [{
        name: '',
        amount: '',
     }],
      groupExpenses: [{
          name: '',
          amount: '',
      }],
      promos: [{
        name: '',
        amount: '',
      }],
      people: '',
      splitExpenses: [],
      showResult: false,
    };
  }

  addIndvExpense = () => {
    const { indvExpenses } = this.state;
    const lastItem = indvExpenses[indvExpenses.length - 1];
    // if last item name and amount is empty; do not add new
    if (indvExpenses.length !== 0 && (!lastItem.name.trim() && !lastItem.amount.trim())) {
      return;
    }
    // add new input fields
    indvExpenses.push({
      name: '',
      amount: '',
    });
    this.setState({ indvExpenses });
  };

  addGroupExpense = () => {
    const { groupExpenses } = this.state;
    const lastItem = groupExpenses[groupExpenses.length - 1];
    // if last item name and amount is empty; do not add new
    if (groupExpenses.length !== 0 && (!lastItem.name.trim() && !lastItem.amount.trim())) {
      return;
    }
    // add new input fields
    groupExpenses.push({
      name: '',
      amount: '',
    });
    this.setState({ groupExpenses });
  };

  addPromo = () => {
    const { promos } = this.state;
    const lastItem = promos[promos.length - 1];
    // if last item name and amount is empty; do not add new
    if (promos.length !== 0 && (!lastItem.name.trim() && !lastItem.amount.trim())) {
      return;
    }
    // add new input fields
    promos.push({
      name: '',
      amount: '',
    });
    this.setState({ promos });
  };

  setIndvExpense = (index, name, amount) => {
    const { indvExpenses } = this.state;
    indvExpenses[index].name = name;
    indvExpenses[index].amount = amount;
    this.setState({ indvExpenses });
  };

  setGroupExpense = (index, name, amount) => {
    const { groupExpenses } = this.state;
    groupExpenses[index].name = name;
    groupExpenses[index].amount = amount;
    this.setState({ groupExpenses });
  };

  setPromo = (index, name, amount) => {
    const { promos } = this.state;
    promos[index].name = name;
    promos[index].amount = amount;
    this.setState({ promos });
  };

  setPeople = value => {
    let ppl = value && value !== 0 ? parseInt(value) : 0;
    if (ppl <= 0) {
      ppl = '';
    }
    this.setState({
      people: ppl,
    });
  };

  calculate = () => {
    const { indvExpenses, groupExpenses, promos, people } = this.state;
    // calculate group expenses total
    let gpExpTotal = 0;
    for (let i = 0; i < groupExpenses.length; i += 1) {
      gpExpTotal += groupExpenses[i].amount ? parseFloat(groupExpenses[i].amount) : 0;
    }
    // calculate promo total
    let promoAmt = 0;
    for (let i = 0; i < promos.length; i += 1) {
      promoAmt += promos[i].amount ? parseFloat(promos[i].amount) : 0;
    }
    const ppl = people ? parseInt(people) : 1;

    // do calculation
    const gpExpAftSplit = gpExpTotal / ppl;
    const promoAmtAftSplit = promoAmt / ppl;
    let totalAmt = 0;
    // filter empty records, then calculate
    let indvAftSplit = indvExpenses.filter(input => {
      if (!input.amount && !input.amount.trim()) {
        return false;
      }
      return true;
    }).map(input => {
      // store total amount
      // if negative, set to 0
      let amt = input.amount ? parseFloat(input.amount) + gpExpAftSplit - promoAmtAftSplit : 0
      amt = amt < 0 ? 0 : amt;
      totalAmt += amt
      return {
        name: input.name,
        amount: amt.toFixed(2),
      };
    });
    // save total amount to state also
    indvAftSplit.push({
      name: 'Total',
      amount: totalAmt.toFixed(2),
    });
    this.setState({
      splitExpenses: indvAftSplit,
      showResult: true,
    });
  };

  render() {
    const {
      addIndvExpense,
      addGroupExpense,
      addPromo,
      setIndvExpense,
      setGroupExpense,
      setPromo,
      setPeople,
      calculate,
    } = this;
    const {
      groupExpenses,
      indvExpenses,
      people,
      promos,
      showResult,
      splitExpenses
    } = this.state;

    // Button State
    const disabledCalc = !(
      // no. of ppl must have
      people &&
      Number.isInteger(parseInt(people)) &&
      parseInt(people) > 0 &&

      // individual expenses must have
      indvExpenses.length > 0 && indvExpenses[0].amount
    );
  
    // Icon
    const addIcon = <FontAwesomeIcon
      className={style.calculator_button_icon}
      icon={faPlus}
    />;

    const IndividualExpenses = indvExpenses.map((input, index) => {
      let field1 = {
        type: 'text',
        placeholder: 'name',
      };
      let field2 = {
        type: 'number',
        placeholder: 'amount',
      };
      return <AmountInput
        key={`idvExp${index}`}
        index={index}
        field1={field1}
        field2={field2}
        setBack={setIndvExpense}
        name={input.name}
        amount={input.amount}
      />;
    });
    const GroupExpenses = groupExpenses.map((input, index) => {
      let field1 = {
        type: 'text',
        placeholder: 'name',
      };
      let field2 = {
        type: 'number',
        placeholder: 'amount',
      };
      return <AmountInput
        key={`gpExp${index}`}
        index={index}
        field1={field1}
        field2={field2}
        setBack={setGroupExpense}
        name={input.name}
        amount={input.amount}
      />;
    });
    const Promos = promos.map((input, index) => {
      let field1 = {
        type: 'text',
        placeholder: 'name',
      };
      let field2 = {
        type: 'number',
        placeholder: 'amount',
      };
      return <AmountInput
        key={`promo${index}`}
        index={index}
        field1={field1}
        field2={field2}
        setBack={setPromo}
        name={input.name}
        amount={input.amount}
      />;
    });

    // if show result, hide calculator
    if (showResult) {
      return <Result
        goBack={() => this.setState({
          showResult: false,
        })}
        expenses={splitExpenses}
      />
    }

    return (
      <div className={style.calculator}>
        <div className={style.title}>
          <p className={style.title_text}>Split Expenses</p>
        </div>
        <div className={`${grid.container} ${style.container_grid}`}>
          <div className={grid.row}>
            {/* Individual Expenses */}
            <div className={`${grid.col_sm} ${style.calculator_container}`}>
              <div className={style.calculator_header}>
                <p className={style.calculator_title}>Individual Expenses</p>
                <IconButton
                  buttonStyle={style.calculator_button}
                  callback={addIndvExpense}
                  icon={addIcon}
                />
              </div>
              {IndividualExpenses}
            </div>

            <div className={`${grid.col_fill}`} style={{ padding: 0 }}>
              <div className={`${grid.container} ${style.container_grid}`}>
                {/* Group Expense & Promo row */}
                <div className={grid.row}>
                  {/* Group Expenses */}
                  <div className={`${grid.col_fill} ${style.calculator_container}`}>
                    <div className={style.calculator_header}>
                      <p className={style.calculator_title}>Group Expenses</p>
                      <IconButton
                        buttonStyle={style.calculator_button}
                        callback={addGroupExpense}
                        icon={addIcon}
                      />
                    </div>
                    {GroupExpenses}
                  </div>

                  {/* Promos */}
                  <div className={`${grid.col_fill} ${style.calculator_container}`}>
                    <div className={style.calculator_header}>
                      <p className={style.calculator_title}>Promos</p>
                      <IconButton
                        buttonStyle={style.calculator_button}
                        callback={addPromo}
                        icon={addIcon}
                      />
                    </div>
                    {Promos}
                  </div>
                </div>

                {/* No. of People */}
                <div className={grid.row}>
                  <div
                    className={`${grid.col_lg} ${style.calculator_container}`}
                    style={{ paddingTop: 0, marginTop: '-1px' }}
                  >
                    <div className={style.calculator_input}>
                      <p className={style.calculator_title}>No. of Ppl</p>
                      <input
                        className={style.calculator_input_people}
                        onChange={evt => setPeople(evt.target.value)}
                        placeholder={'no. of ppl'}
                        type='number'
                        value={people}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${grid.container} ${style.container_grid}`}>
          <div className={grid.row}>
            {/* Caculate Button */}
            <div className={grid.col_lg} style={{ paddingLeft: '15px' }}>
              <Button
                buttonStyle={style.calculator_calcButton}
                callback={calculate}
                disabled={disabledCalc}
                text={'Split'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
