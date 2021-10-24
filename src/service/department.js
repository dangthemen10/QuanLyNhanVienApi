'use-strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Department = db.department;
const {
badRequestException, 
notFoundException 
} = require('../lib/exception');
const dateUtils = require('../lib/dateUtils');

const getAllDepartment = async () => {
    let departments = await Department.findAll();
    if(departments == null){
        throw notFoundException({
            status:`NOT_FOUND`,
            message: `Departments already exist!`
        });
    }
    return departments;
};

const getOneDepartment = async departmentId => {
    let department = await Department.findOne({
        where: {
            id: {
                [Op.eq]: departmentId
            }
        }
    });
    if(department == null){
        throw notFoundException({
            status: `NOT_FOUND`,
            message: `Cannot find Department with id: ${departmentId} !`
        });
    }
    return department;
};

const createDepartment = async data => {
    const now = dateUtils.getDateTimeCurrent();
    if (!data.deptId || !data.deptName) {
        throw badRequestException({
            status: `BAD_REQUEST`,
            message: `Parameter is not exist!`
        });
    }
    
    data.createAt = now;
    data.updateAt = now;
    let result = await Department.create(data);
    
    return result;
};

const updateDepartment = async (departmentId, data) => {
    const now = dateUtils.getDateTimeCurrent();
    await getOneDepartment(departmentId);

    if (!data.deptId || !data.deptName) {
        throw badRequestException({
            status: `BAD_REQUEST`,
            message: `Parameter is not exist!`
        });
    }

    data.updateAt = now;
    await Department.update(data, {
        where: {
            id: {
                [Op.eq]: departmentId
            }
        }
    });

    return await getOneDepartment(departmentId);
};

const deleteDepartment = async departmentId => {
    const department = await getOneDepartment(departmentId);
    if (department) {
        await Department.destroy({
            where: {
                id: {
                    [Op.eq]: departmentId
                }
            } 
        });
    }
    return await getAllDepartment();
}


module.exports = {
    getAllDepartment,
    getOneDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}