'use-strict';

const departmentService = require('../service/department');

const getAllDepartment = async (req, res) => {
    try {
        let result = await departmentService.getAllDepartment();
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const getOneDepartment = async (req, res) => {
    let departmentId = req.params.id;
    try {
        let result = await departmentService.getOneDepartment(departmentId);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const createDepartment = async (req, res) => {
    try {
        const data = {
            deptId: req.body.deptId,
            deptName: req.body.deptName
        };
        let result = await departmentService.createDepartment(data);
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const data = {
            deptId: req.body.deptId,
            deptName: req.body.deptName
        };
        let result = await departmentService.updateDepartment(req.params.id, data);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        let result = await departmentService.deleteDepartment(req.params.id);
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
}

module.exports = {
    getAllDepartment,
    getOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}