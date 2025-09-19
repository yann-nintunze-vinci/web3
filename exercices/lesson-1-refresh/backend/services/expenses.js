const fs = require("fs");

let expenses = JSON.parse(fs.readFileSync("./data/expenses.json", "utf-8"));
const initExpenses = fs.readFileSync("./data/expenses.init.json", "utf-8");

const getAllExpenses = () => {
    return expenses;
}

const addExpense = (newExpense) => {
    expenses.push(newExpense);

    fs.writeFileSync("./data/expenses.json", JSON.stringify(expenses));
}

const resetExpenses = () => {
    fs.writeFileSync("./data/expenses.json", initExpenses);
    expenses = JSON.parse(fs.readFileSync("./data/expenses.json", "utf-8"));
    
    return expenses;
}

module.exports = { getAllExpenses, addExpense, resetExpenses}