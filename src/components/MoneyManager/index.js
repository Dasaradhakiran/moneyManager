import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    transactionList: [],
    balanceAmount: 0,
    incomeAmount: 0,
    expensesAmount: 0,
    transactionType: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeOption = event => {
    this.setState({transactionType: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {
      inputTitle,
      inputAmount,
      transactionType,
      balanceAmount,
      incomeAmount,
      expensesAmount,
    } = this.state

    if (inputTitle !== '' && inputAmount !== '') {
      let addNew = false
      if (transactionType === 'INCOME') {
        this.setState({
          balanceAmount: incomeAmount + parseInt(inputAmount) - expensesAmount,
        })
        this.setState(prevState => ({
          incomeAmount: prevState.incomeAmount + parseInt(inputAmount),
        }))
      }
      if (
        transactionType === 'EXPENSES' &&
        balanceAmount >= parseInt(inputAmount)
      ) {
        addNew = true
        const availableExpenses = expensesAmount + parseInt(inputAmount)
        this.setState({balanceAmount: incomeAmount - availableExpenses})
        this.setState(prevState => ({
          expensesAmount: prevState.expensesAmount + parseInt(inputAmount),
        }))
      }

      const typeTextList = transactionTypeOptions.filter(
        eachType => eachType.optionId === transactionType,
      )
      const newTransaction = {
        id: v4(),
        title: inputTitle,
        amount: inputAmount,
        typeId: transactionType,
        typeText: typeTextList[0].displayText,
      }

      if (transactionType === 'EXPENSES') {
        if (addNew === true) {
          this.setState(prevState => ({
            transactionList: [...prevState.transactionList, newTransaction],
          }))
        }
      } else {
        this.setState(prevState => ({
          transactionList: [...prevState.transactionList, newTransaction],
        }))
      }
      this.setState({
        inputTitle: '',
        inputAmount: '',
        transactionType: transactionTypeOptions[0].optionId,
      })
    }
  }

  onDeleteTransaction = transaction => {
    const {id, typeId, amount} = transaction
    const {
      transactionList,
      balanceAmount,
      incomeAmount,
      expensesAmount,
    } = this.state
    if (typeId === 'INCOME' && balanceAmount >= parseInt(amount)) {
      this.setState({
        balanceAmount: incomeAmount - parseInt(amount) - expensesAmount,
      })
      this.setState(prevState => ({
        incomeAmount: prevState.incomeAmount - parseInt(amount),
      }))
      const filterList = transactionList.filter(eachItem => eachItem.id !== id)
      this.setState({transactionList: filterList})
    }
    if (typeId === 'EXPENSES') {
      this.setState({
        balanceAmount: incomeAmount - (expensesAmount - parseInt(amount)),
      })
      this.setState(prevState => ({
        expensesAmount: prevState.expensesAmount - parseInt(amount),
      }))
      const filterList = transactionList.filter(eachItem => eachItem.id !== id)
      this.setState({transactionList: filterList})
    }
  }

  render() {
    const {
      inputTitle,
      inputAmount,
      incomeAmount,
      expensesAmount,
      balanceAmount,
      transactionList,
      transactionType,
    } = this.state

    const moneyDetails = {
      balanceAmount,
      incomeAmount,
      expensesAmount,
    }

    return (
      <div className="app-cont">
        <div className="name-cont">
          <h1 className="name-cont-text">Hi,Richard</h1>
          <p className="name-cont-para">
            Welcome back to your{' '}
            <span className="name-cont-para-style">Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails moneyDetails={moneyDetails} />
        </div>
        <div className="card-3">
          <form onSubmit={this.addTransaction} className="form-cont">
            <h1 className="form-head">Add Transaction</h1>
            <label className="form-label-text" htmlFor="titleId">
              TITLE
            </label>
            <input
              placeholder="TITLE"
              className="form-input-elem"
              id="titleId"
              type="text"
              onChange={this.onChangeTitle}
              value={inputTitle}
            />
            <label className="form-label-text" htmlFor="amountId">
              AMOUNT
            </label>
            <input
              placeholder="AMOUNT"
              className="form-input-elem"
              id="amountId"
              type="text"
              onChange={this.onChangeAmount}
              value={inputAmount}
            />
            <label className="form-label-text" htmlFor="type-input">
              TYPE
            </label>
            <select
              className="form-input-elem"
              id="type-input"
              onChange={this.onChangeOption}
              value={transactionType}
            >
              {transactionTypeOptions.map(eachType => (
                <option value={eachType.optionId} key={eachType.optionId}>
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button className="form-button" type="submit">
              Add
            </button>
          </form>
          <div className="transactions-cont">
            <h1 className="form-head">History</h1>
            <div className="transactions-main-head-cont">
              <div className="transactions-main-head-sub-cont">
                <p className="transactions-main-head">Title</p>
              </div>
              <div className="transactions-main-head-sub-cont">
                <p className="transactions-main-head">Amount</p>
              </div>
              <div className="transactions-main-head-sub-cont">
                <p className="transactions-main-head">Type</p>
              </div>
            </div>
            <ul className="ul-cont">
              {transactionList.map(eachItem => (
                <TransactionItem
                  transactionDetails={eachItem}
                  key={eachItem.id}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
