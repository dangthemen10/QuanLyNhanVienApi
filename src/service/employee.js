'use-strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Employee = db.employee;
const Department = db.department;
const Project = db.project;
const Group = db.group;
const {
    badRequestException,
    notFoundException 
} = require('../lib/exception');
const dateUtils = require('../lib/dateUtils');
const { getOneDepartment } = require('./department');
const { getOneGroup } = require('./group');
const { getOneProject } = require('./project');

const getAllEmployee = async () => {
    let result = await Employee.findAll({
        attributes: {
            exclude:[
                'departmentId', 'DepartmentId', 
                'groupId', 'GroupId', 
                'projectId','ProjectId', 
                'createdAt', 'updatedAt'
            ]
        },
        include: [
            {
                model: Department, 
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                }
            },
            {
                model: Group, 
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                }
            },
            {
                model: Project, 
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                }
            }
        ],
        raw: true
    });

    if(result == null){
        throw notFoundException({
            status: `NOT_FOUND`,
            message: `Employees already exist!`
        });
    }

    return result;
};

const getOneEmployee = async employeeId => {
    let employee = await Employee.findOne({
        attributes: {
            exclude:[
                'DepartmentId', 'GroupId', 'ProjectId'
            ]
        },
        where: {
            id: {
                [Op.eq]: employeeId
            }
        }
    });
    if(employee == null){
        throw notFoundException({
            status: `NOT_FOUND`,
            message: `Cannot find Employee with id: ${employeeId}!`
        });
    }
    return employee;
};

const createEmployee = async data => {
    const now = dateUtils.getDateTimeCurrent();

    if (!data.fullName){
        throw badRequestException({
            message: "Full name is not empty!"
        });
    };

    if (!data.departmentId){
        throw badRequestException({
            message: "Department is not exits!"
        });
    };

    if (!data.groupId){
        throw badRequestException({
            message: "Group is not exits!"
        });
    };

    if (!data.projectId){
        throw badRequestException({
            message: "Project is not exits!"
        });
    };

    let department = await getOneDepartment(data.departmentId);
    if (!department) {
        throw badRequestException({
            message: 'Department is not exits!'
        });
    };

    let group = await getOneGroup(data.groupId);
    if (!group) {
        throw badRequestException({
            message: 'Group is not exits!'
        });
    };

    let project = await getOneProject(data.projectId);
    if (!project) {
        throw badRequestException({
            message: 'Project is not exits!'
        });
    };

    data.createAt = now;
    data.updateAt = now;
    let employee = await Employee.create(data);

    return employee;
};

const updateEmployee = async (employeeId, data) => {
    const now = dateUtils.getDateTimeCurrent();

    if(data.departmentId){
        let department = await getOneDepartment(data.departmentId);
        if (!department) {
            throw badRequestException({
                message: 'Department is not exits!'
            });
        };
    }

    if (data.groupId) {
        let group = await getOneGroup(data.groupId);
        if (!group) {
            throw badRequestException({
                message: 'Group is not exits!'
            });
        };
    }

    if (data.projectId) {
        let project = await getOneProject(data.projectId);
        if (!project) {
            throw badRequestException({
                message: 'Project is not exits!'
            });
        };
    }

    let employee = await getOneEmployee(employeeId);
    if (employee) {
        await Employee.update({
            fullName: data.fullname,
            gender: data.gender,
            dayOfBirth: data.birth,
            address: data.address,
            phone: data.phone,
            email: data.email,
            departmentId: data.department,
            groupId: data.group,
            projectId: data.project,
            updateAt: now
        }, {
            where: {
                id: {
                    [Op.eq]: employeeId
                }
            }
        });
    }
    return await getOneEmployee(employeeId);
};

const deleteEmployee = async employeeId => {

    if (!employeeId) {
        throw badRequestException({
            message: 'Employee is not exist!'
        });
    }

    let employee = await getOneEmployee(employeeId);

    if (employee) {
        await Employee.destroy(employee);
    }

    return await getAllEmployee();
}

const filterEmployeesByDepartment = async name => {
    let result = await Employee.findAll({
        attributes: {
            exclude:[
                'DepartmentId', 'GroupId','ProjectId',
            ]
        },
        include: [
            {
                model: Department,
                attributes: {
                    exclude: [
                        'id', 'deptName', 'deptId', 'createdAt', 'updatedAt'
                    ]
                },
                where:{
                    deptName: {
                        [Op.like]: name
                    }
                }
            }
        ]
    });
    return result;
}

module.exports = {
    getAllEmployee,
    getOneEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    filterEmployeesByDepartment
}