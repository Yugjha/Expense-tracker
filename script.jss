const balance = document.getElementById('balance');
const transactions = document.getElementById('transactions');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactionList = [];

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    const transaction = {
      id: Date.now(),
      description,
      amount
    };
    transactionList.push(transaction);
    updateUI();
    transactionForm.reset();
  }
});

function updateUI() {
  transactions.innerHTML = '';
  let totalBalance = 0;

  transactionList.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
    li.innerHTML = `
      ${transaction.description} 
      <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount}</span>
      <button onclick="deleteTransaction(${transaction.id})">x</button>
    `;
    transactions.appendChild(li);

    totalBalance += transaction.amount;
  });

  balance.textContent = `Balance: $${totalBalance.toFixed(2)}`;
}

function deleteTransaction(id) {
  transactionList = transactionList.filter(transaction => transaction.id !== id);
  updateUI();
}
