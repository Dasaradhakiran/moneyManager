// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {balanceAmount, incomeAmount, expensesAmount} = moneyDetails

  return (
    <div className="money-cont">
      <div className="balance-cont">
        <img
          className="balance-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p className="balance-text">Your Balance</p>
          <p className="balance-amount" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-cont">
        <img
          className="balance-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p className="balance-text">Your Income</p>
          <p className="balance-amount" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-cont">
        <img
          className="balance-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p className="balance-text">Your Expenses</p>
          <p className="balance-amount" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
