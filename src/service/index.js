'use-strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const User = db.user;
const Employee = db.employee;
const Group = db.group;
const Project = db.project;
const Department = db.department;
const { 
    badRequestException, 
    notFoundException,
    unauthorizedException
 } = require('../lib/exception');
const bcrypt = require('bcrypt');
const dateUtils = require('../lib/dateUtils');
const saltRounds = 10;

const getOneUser = async email => {

    let user = await User.findOne({
        where: {
            email: {
                [Op.like]: email
            }
        }
    });

    if(user == null){
        throw notFoundException({
            status: `NOT_FOUND`, 
            message: `Cannot find Project with email: ${email} !`
        });
    }
    return user;
};

const isEmailExist = async email => {
    let user = await User.findOne({
        where: {
            email: {
                [Op.like]: email
            }
        }
    });

    if (user) {
        return true;
    }

    return false;
};

const createUser = async (email, password) => {
    const now = dateUtils.getDateTimeCurrent()
    if (!email || !password) {
        throw badRequestException({
            status: 'BAD_REQUEST',
            message: 'Parameter is not exist!'
        })
    }
    let user = await User.create({
        email: email,
        password: password,
        createAt: now,
        updateAt: now
    });
    return user;
};

const login = async (email, pass) => {
    if (!email || !pass) {
        throw badRequestException({
            status: 'BAD_REQUEST',
            message: 'Parameter is not exist!'
        })
    }

    let user = getOneUser(email);

    let result = await bcrypt.compare(pass, (await user).getDataValue('password'));
    if (!result) {
        throw unauthorizedException({
            status: 'UNAUTHORIZED',
            message: 'Unauthentiacted!'
        });
    }
    return user;
};

const getInfoEmployees = async () => {
    let result = await Employee.findAll({
        attributes: [
            'id', 'fullName', 'Department.deptName', 'Group.groupName', 'Project.projectName'
        ],
        include: [
            {
                model: Department, 
                attributes: {
                    exclude: ['id', 'deptId', 'deptName', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Group, 
                attributes: {
                    exclude: ['id', 'roleGroup' ,'groupName', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Project, 
                attributes: {
                    exclude: ['id','projectName', 'createdAt', 'updatedAt']
                }
            }
        ],
        raw: true
    });
    return result;
}

module.exports = {
    isEmailExist,
    createUser,
    login,
    getInfoEmployees
}