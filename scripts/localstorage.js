const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("budgetArray");

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
};

const saveToLocalStorage = (expense) => {
    let budgetArray = getLocalStorage();
    const currentExpense = budgetArray.findIndex(existingexpense => existingexpense.name === expense.name);
    if (currentExpense !== -1) {
        budgetArray[currentExpense] = expense;
    } else {
        budgetArray.push(expense);
    }

    localStorage.setItem("budgetArray", JSON.stringify(budgetArray));
};

const removeFromLocalStorage = (expense) => {
    let budgetArray = getLocalStorage();
    const currentExpense = budgetArray.findIndex(existingexpense => existingexpense.name === expense.name);
    if(currentExpense !== -1){
        budgetArray.splice(currentExpense, 1);
    }
    localStorage.setItem("budgetArray", JSON.stringify(budgetArray));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };