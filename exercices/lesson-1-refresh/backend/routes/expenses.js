var express = require('express');
const { getAllExpenses, addExpense, resetExpenses } = require('../services/expenses');
var router = express.Router();

router.get('/expenses', (req, res, next) => {
    const expenses = getAllExpenses();

    res.json(expenses);
});

router.post('/expenses', (req, res, next) => {
    const newExpense = req.body;

    addExpense(newExpense);
    res.status(201).json(newExpense);
});

router.post('/expenses/reset', (req, res, next) => {
    const resetJson = resetExpenses();
    res.status(200).json(resetJson);
});

module.exports = router;