const fs = require("fs");

let expenses = JSON.parse(fs.readFileSync("./data/expenses.json", "utf-8"));
const initExpenses = fs.readFileSync("./data/expenses.init.json", "utf-8");

const getAllExpenses = (sort) => {
    if (sort === "date-asc") {
        expenses = expenses.sort((exp1, exp2) => new Date(exp1.date).getTime() - new Date(exp2.date).getTime());
    } else if (sort === "date-desc") {
         expenses = expenses.sort((exp1, exp2) => new Date(exp2.date).getTime() - new Date(exp1.date).getTime());
    } else if (sort === "amount-asc") {
        expenses = expenses.sort((exp1, exp2) => exp1.amount - exp2.amount);
    } else if (sort === "amount-desc") {
        expenses = expenses.sort((exp1, exp2) => exp2.amount - exp1.amount);
    }
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