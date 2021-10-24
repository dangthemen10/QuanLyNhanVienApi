'use-strict';

const employeeController = require("../controllers/employee");
const express = require('express');
const router = express.Router();

router.get('/employees',  employeeController.getEmployees);
router.get('/employee/:id', employeeController.getEmployee);
router.get('/filter/:name?', employeeController.filterEmployeesByDepartment);
router.post('/employee', employeeController.createEmployee);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;