const express = require('express');
const router = express.Router();
const EmployeesControler = require('../controllers/employees.controller');

router.get('/employees', EmployeesControler.get);
router.get('/employees/random', EmployeesControler.getRandom);
router.get('/employees/:id', EmployeesControler.getById);
router.post('/employees', EmployeesControler.post);
router.put('/employees/:id', EmployeesControler.put);
router.delete('/employees/:id', EmployeesControler.delete);

module.exports = router;
