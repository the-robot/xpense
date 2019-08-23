import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button, IconButton } from '../Common';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// styling
import grid from '../../styles/components/grid.scss';
import style from '../../styles/components/home.scss';


class AmountInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value1: props.value1,
      value2: props.value2,
    }
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
          name: '',
          amount: ''
        },
      ],
      sharedExpenses: [
        {
          name: '',
          amount: ''
        },
      ],
      promos: [
        {
          name: '',
          amount: ''
        },
      ],
      people: '',
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

  addSharedExpense = () => {
    const { sharedExpenses } = this.state;
    const lastItem = sharedExpenses[sharedExpenses.length - 1];
    // if last item name and amount is empty; do not add new
    if (!lastItem.name.trim() && !lastItem.amount.trim()) {
      return;
    }
    // add new input fields
    sharedExpenses.push({
      name: '',
      amount: '',
    });
    this.setState({ sharedExpenses });
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

  setSharedExpense = (index, name, amount) => {
    const { sharedExpenses } = this.state;
    sharedExpenses[index].name = name;
    sharedExpenses[index].amount = amount;
    this.setState({ sharedExpenses });
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
    alert('Calculate');
  };

  render() {
    const {
      addIndvExpense,
      addSharedExpense,
      addPromo,

      setIndvExpense,
      setSharedExpense,
      setPromo,
      setPeople,

      calculate,
    } = this;
    const { indvExpenses, sharedExpenses, promos, people } = this.state;

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
    const SharedExpenses = sharedExpenses.map((input, index) => {
      let field1 = {
        type: 'text',
        placeholder: 'name',
      };
      let field2 = {
        type: 'number',
        placeholder: 'amount',
      };
      return <AmountInput
        key={`sharedExp${index}`}
        index={index}
        field1={field1}
        field2={field2}
        setBack={setSharedExpense}
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

            {/* Shared Expenses */}
            <div className={`${grid.col_sm} ${style.calculator_container}`}>
              <div className={style.calculator_header}>
                <p className={style.calculator_title}>Shared Expenses</p>
                <IconButton
                  buttonStyle={style.calculator_button}
                  callback={addSharedExpense}
                  icon={addIcon}
                />
              </div>
              {SharedExpenses}
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
              style={{ paddingTop: 0, paddingLeft: '15px' }}
            >
              <Button
                buttonStyle={style.calculator_calcButton}
                callback={calculate}
                text={'Split Expense'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
