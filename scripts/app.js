import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

let remaingBudget = document.getElementById("remaingBudget");

let startBudget = document.getElementById("startBudget");

let expensesDiv = document.getElementById("expensesDiv");

let updateBtn = document.getElementById("updateBtn");

let addBtn = document.getElementById("addBtn");

let inputBudget = document.getElementById("inputBudget");

let ModalDiv = document.getElementById("ModalDiv");

let expenseName = document.getElementById("expenseName");

let expenseAmount = document.getElementById("expenseAmount");

let startAmount = 0;

const createDiv = (expense) => {

    let rowDiv = document.createElement('div');

    rowDiv.classList.add("row", "pb-2", "text-center");

    let nameDiv = document.createElement('div');

    nameDiv.classList.add("col-6");

    let spentDiv = document.createElement('div');

    spentDiv.classList.add("col-6");

    let p = document.createElement('p');

    p.textContent = expense.name;

    let p2 = document.createElement('p');

    p2.textContent = "-" + expense.amount;

    nameDiv.appendChild(p);

    spentDiv.appendChild(p2);

    rowDiv.append(nameDiv, spentDiv);

    expensesDiv.appendChild(rowDiv);
}

const createDivModal = (expense) => {

    let rowDiv = document.createElement('div');

    rowDiv.classList.add("row", "text-center");

    let nameDiv = document.createElement('div');

    nameDiv.classList.add("col-6");

    let buttonDiv = document.createElement('div');

    buttonDiv.classList.add("col-6");

    let p = document.createElement('p');

    p.textContent = expense.name;

    let button = document.createElement('button');

    button.innerHTML = "Remove"

    button.classList.add("btn", "btn-sm", "btn-danger",);

    nameDiv.appendChild(p);

    buttonDiv.appendChild(button);

    rowDiv.append(nameDiv, buttonDiv);

    ModalDiv.appendChild(rowDiv);

    button.addEventListener('click', () => {
        removeFromLocalStorage(expense);
        BudgetFill();
    });
}

const BudgetFill = () => {
    let budgetArray = getLocalStorage();

    expensesDiv.innerHTML = "";

    ModalDiv.innerHTML = "";

    budgetArray.forEach(expense => {
        if ('budget' in expense) {

            startAmount = expense.budget;

            startBudget.textContent = startAmount;
        }
    });
    
    let budgetRemain = parseFloat(startAmount);

    budgetArray.forEach(expense => {
        if (!('budget' in expense)) {

            createDiv(expense);

            createDivModal(expense);

            budgetRemain -= expense.amount;
        }
    });

    remaingBudget.textContent = budgetRemain.toFixed(2);
}

updateBtn.addEventListener('click', () => {
    const inputValue = parseFloat(inputBudget.value);

    if (inputValue) {

        startAmount = inputValue.toFixed(2);

        saveToLocalStorage({
            budget: startAmount
        });

        BudgetFill();
    }
});

addBtn.addEventListener('click', () => {
    const inputName = expenseName.value;

    const inputValue = parseFloat(expenseAmount.value);

    if (inputName && inputValue) {

        saveToLocalStorage({
            name: inputName,
            amount: inputValue.toFixed(2)
        });

        BudgetFill();
    }
});

window.addEventListener('load', () => {
    BudgetFill();
});
