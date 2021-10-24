'use-strict';

const departmentController = require("../controllers/department");
const express = require('express');
const router = express.Router();

router.get('/departments',  departmentController.getAllDepartment);
router.get('/department/:id', departmentController.getOneDepartment);
router.post('/department', departmentController.createDepartment);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;