'use-strict';

const employeeService = require('../service/employee');

const getEmployees = async (req, res) => {
    try {
        let employees = await employeeService.getAllEmployee();
        return res.status(200).json({
            data: employees
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const getEmployee = async (req, res) => {
    const employeeId = req.params.id;
    try {
        let employees = await employeeService.getOneEmployee(employeeId);
        return res.status(200).json({
            data: employees
        });
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
}

const createEmployee = async (req, res) => {
    try {
        const data = {
            fullName: req.body.fullname,
            gender: req.body.gender,
            dayOfBirth: req.body.birth,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            departmentId: req.body.department,
            groupId: req.body.group,
            projectId: req.body.project
        };

        let result = await employeeService.createEmployee(data);

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        return res.status(400).json({
            Error: error
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const data = req.body;

        let result = await employeeService.updateEmployee(req.params.id, data);

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        return res.status(404).json({
            Error: error
        }); 
    }
};

const deleteEmployee = async (req, res) => {
    try {
        let result = await employeeService.deleteEmployee(req.params.id);

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
}

const filterEmployeesByDepartment = async (req, res) => {
    try {
        let result = await employeeService.filterEmployeesByDepartment(req.query.name);

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
}

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    filterEmployeesByDepartment
}