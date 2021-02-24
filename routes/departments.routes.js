const express = require('express');
const router = express.Router();
const DepartmentControler = require('../controllers/departments.controller');


router.get('/departments', DepartmentControler.get);
router.get('/departments/random', DepartmentControler.getRandom);
router.get('/departments/:id', DepartmentControler.getById);
router.post('/departments', DepartmentControler.post);
router.put('/departments/:id', DepartmentControler.put);
router.delete('/departments/:id', DepartmentControler.delete);

module.exports = router;
