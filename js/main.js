import members from './model/members.js';
import expenses from './model/expenses.js';
import funds from './model/funds.js';
import investments from './model/investments.js';
import example from './model/example.js';


function displayMembers()
{
    const row = document.querySelector('#members');
    for (const member of members) {
        const element = loadMember(member);
        row.insertAdjacentHTML('beforeend', element);
    }
}


function displayItems() {
    const elements = {
        expenses: expenses,
        funds: funds,
        investments: investments
    };

    for (const elType in elements) {
        const row = document.querySelector(`#${elType}`);
        for (const item of elements[elType]) {
            const element = loadTransaction(item);
            row.insertAdjacentHTML('beforeend', element);
        }
    }
}


function loadMember(member)
{
    const text = `<div class="col-2 text-center fs-5">
        <a href="#" class="text-dark text-decoration-none">
        <i class="fas fa-${member.image}" style="font-size: 3em;"></i>
        <p class="legend">${member.name}</p>
        </a>
    </div>`;

    return text;
}


function loadTransaction(item)
{
    const text = `<div class="col-2 text-center fs-5">
    <a href="#" class="text-dark text-decoration-none">
      <div class="feature-icon bg-secondary">
        <i class="fas fa-${item.image} fs-3"></i>
      </div>
    <p class="legend">${item.name}</p></a>
    </div>`;

    return text;
}


function calcTransactions()
{
    const fundsSum = sumTransactions('reserva');
    const investmentsSum = sumTransactions('investimento');
    const expensesSum = sumTransactions('despesa');
    const totalIncomes= document.querySelector('#total-incomes');
    totalIncomes.insertAdjacentHTML('beforeend', (fundsSum + investmentsSum).toFixed(2));
    const totalExpenses= document.querySelector('#total-expenses');
    totalExpenses.insertAdjacentHTML('beforeend', expensesSum.toFixed(2));
    
}


function sumTransactions(transaction)
{
    const allTransactions = example.filter((value) => value.type === transaction);
    const totalSum = allTransactions.reduce((addition, value) => addition + value.value, 0);
    return totalSum;

}

displayMembers();
displayItems()
calcTransactions();
