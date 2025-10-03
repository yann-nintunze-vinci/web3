var express = require('express');
const { getAllExpenses, addExpense, resetExpenses } = require('../services/expenses');
var router = express.Router();

router.get('/', async (req, res) => {
    const expenses = await getAllExpenses(req.query.orderBy);

    res.json(expenses);
});

router.post('/', async (req, res) => {
    const newExpense = await addExpense(req.body);
    res.status(201).json(newExpense);
});

router.post('/reset', async (_, res) => {
    await resetExpenses();
    res.status(200).json({message: "reset successfully"});
});

module.exports = router;