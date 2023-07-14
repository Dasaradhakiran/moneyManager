// Write your code here

import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props
  const {title, amount, typeText} = transactionDetails

  const deleteItem = () => {
    onDeleteTransaction(transactionDetails)
  }

  return (
    <li className="transaction-cont">
      <div className="display-text-cont">
        <p className="display-text">{title}</p>
      </div>
      <div className="display-text-cont">
        <p className="display-text">{amount}</p>
      </div>
      <div className="display-text-cont">
        <p className="display-text">{typeText}</p>
      </div>
      <button
        className="delete-button"
        data-testid="delete"
        type="button"
        onClick={deleteItem}
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
