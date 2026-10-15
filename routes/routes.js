const express = require('express');
const router = express.Router();
const {allEmployees,
    getEmployees,
    newEmployee,
    updateEmployee,
    deleteEmployee} = require('../controller/employee.js');


const logger=require('../middleware/logger.js');

router.get('/allEmployees', logger, allEmployees);
router.get('/getEmployees/:id', logger, getEmployees);
router.post('/newEmployee', logger, newEmployee);
router.put('/updateEmployee/:id', logger, updateEmployee);
router.delete('/deleteEmployee/:id', logger, deleteEmployee);

module.exports = router;