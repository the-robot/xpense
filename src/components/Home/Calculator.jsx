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
      value1: props.value1,
      value2: props.value2,
    };
  }

  onInput1Change = value1 => {
    const { setStateInParent } = this;
    this.setState({ value1 }, setStateInParent);
  }

  onInput2Change = value2 => {
    const { setStateInParent } = this;
    this.setState({ value2 }, setStateInParent);
  }

  setStateInParent = () => {
    const { value1, value2 } = this.state;
    const { index, setBack } = this.props;
    setBack(index, value1, value2);
  }

  render() {
    const { onInput1Change, onInput2Change } = this;
    const { value1, value2 } = this.state;
    const { field1, field2 } = this.props;

    return (
      <div className={style.calculator_input}>
        <input
          className={style.calculator_input_left}
          onChange={evt => onInput1Change(evt.target.value)}
          placeholder={field1.placeholder}
          type={field1.type}
          value={value1}
        />
        <input
          className={style.calculator_input_right}
          onChange={evt => onInput2Change(evt.target.value)}
          placeholder={field2.placeholder}
          type={field2.type}
          value={value2}
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

  value1: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indvExpenses: [
        {
          name: 'A',
          amount: '2.7'
        },
        {
          name: 'B',
          amount: '3.2'
        },
        {
          name: 'C',
          amount: '3.5'
        },
        {
          name: 'D',
          amount: '3.8'
        },
        {
          name: 'E',
          amount: '5.9'
        },
        {
          name: 'F',
          amount: '3.7'
        },
        {
          name: 'G',
          amount: '4.6'
        },
        {
          name: 'H',
          amount: '3.5'
        },
      ],
      groupExpenses: [
        {
          name: 'Delivery',
          amount: '5'
        },
      ],
      promos: [
        {
          name: 'Discount',
          amount: '9.3'
        },
      ],
      people: '8',
      splitExpenses: [
        {
          name: 'A',
          amount: '2.7'
        },
        {
          name: 'B',
          amount: '3.2'
        },
        {
          name: 'C',
          amount: '3.5'
        },
        {
          name: 'D',
          amount: '3.8'
        },
        {
          name: 'E',
          amount: '5.9'
        },
        {
          name: 'F',
          amount: '3.7'
        },
        {
          name: 'G',
          amount: '4.6'
        },
        {
          name: 'H',
          amount: '3.5'
        },
      ],
      showResult: true,
    };
  }

  addIndvExpense = () => {
    const { indvExpenses } = this.state;
    const lastItem = indvExpenses[indvExpenses.length - 1];
    // if last item name and amount is empty; do not add new
    if (!lastItem.name.trim() && !lastItem.amount.trim()) {
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
    if (!lastItem.name.trim() && !lastItem.amount.trim()) {
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
    if (!lastItem.name.trim() && !lastItem.amount.trim()) {
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
    this.setState({
      people: value,
    });
  };

  calculate = () => {
    const { indvExpenses, groupExpenses, promos, people } = this.state;
    // calculate group expenses total
    let gpExpTotal = 0;
    for (let i = 0; i < groupExpenses.length; i += 1) {
      gpExpTotal += groupExpenses[i].amount && groupExpenses[i].amount.trim() ? parseFloat(groupExpenses[i].amount) : 0;
    }
    // calculate promo total
    let promoAmt = 0;
    for (let i = 0; i < promos.length; i += 1) {
      promoAmt += promos[i].amount && promos[i].amount.trim() ? parseFloat(promos[i].amount) : 0;
    }
    const ppl = people && people.trim() ? parseInt(people) : 1;

    // do calculation
    const gpExpAftSplit = gpExpTotal / ppl;
    const promoAmtAftSplit = promoAmt / ppl;
    let totalAmt = 0;
    let indvAftSplit = indvExpenses.map(input => {
      // store total amount
      let amt = input.amount && input.amount.trim() ? parseFloat(input.amount) + gpExpAftSplit - promoAmtAftSplit : 0
      totalAmt += amt
      return {
        name: input.name,
        amount: amt,
      };
    });
    // save total amount to state also
    indvAftSplit.push({
      name: 'Total',
      amount: totalAmt,
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
    const { indvExpenses, groupExpenses, promos, people, showResult, splitExpenses } = this.state;

    // Button State
    const disabledCalc = !(people && people.trim())
  
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
        value1={input.name}
        value2={input.amount}
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
        value1={input.name}
        value2={input.amount}
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
        value1={input.name}
        value2={input.amount}
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

            {/* Group Expenses */}
            <div className={`${grid.col_sm} ${style.calculator_container}`}>
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
            <div className={`${grid.col_sm} ${style.calculator_container}`}>
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
        </div>

        <div className={`${grid.container} ${style.container_grid}`}>
          <div className={grid.row}>
            {/* No. People */}
            <div className={`${grid.col_sm} ${style.calculator_container}`}>
              <div className={style.calculator_input}>
                <p className={style.calculator_title}>No. of People</p>
                <input
                  className={style.calculator_input_people}
                  onChange={evt => setPeople(evt.target.value)}
                  placeholder={'no. of people'}
                  type='number'
                  value={people}
                />
              </div>
            </div>
          </div>

          <div className={grid.row}>
            {/* Caculate Button */}
            <div
              className={`${grid.col_sm} ${style.calculator_container}`}
              style={{ paddingLeft: '15px' }}
            >
              <Button
                buttonStyle={style.calculator_calcButton}
                callback={calculate}
                disabled={disabledCalc}
                text={'Split Expenses'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
