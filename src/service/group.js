'use-strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Group = db.group;
const { 
    badRequestException, 
    notFoundException 
} = require('../lib/exception');
const dateUtils = require('../lib/dateUtils');

const getAllGroup = async () => {
    let groups = await Group.findAll();
    if(groups == null){
        throw notFoundException({
            status: `NOT_FOUND`, 
            message: `Groups already exist!`
        });
    }
    return groups;
};

const getOneGroup = async groupId => {
    let group = await Group.findOne({
        where: {
            id: {
                [Op.eq]: groupId
            }
        }
    });
    if(group == null){
        throw notFoundException({
            status: `NOT_FOUND`, 
            message: `Cannot find Group with id: ${groupId} !`
        });
    }
    return group;
};

const createGroup = async data => {
    const now = dateUtils.getDateTimeCurrent();
    if (!data.roleGroup) {
        throw badRequestException({
            status: `BAD_REQUEST`,
            message: `Parameter is not exist!`
        });
    }

    data.createAt = now;
    data.updateAt = now;

    let result = await Group.create(data);
    
    return result;
};

const updateGroup = async (groupId, data) => {
    await getOneGroup(groupId);
    if (!data.roleGroup) {
        throw badRequestException({
            status: `BAD_REQUEST`, 
            message: `Parameter is not exist!`
        });
    }

    const now = dateUtils.getDateTimeCurrent();
    data.updateAt = now;
    await Group.update(data, {
        where: {
            id: {
                [Op.eq]: groupId
            }
        }
    });

    return await getOneGroup(groupId);
};

const deleteGroup = async groupId => {
    const group = await getOneGroup(groupId);
    if (group) {
        await Group.destroy({
            where: {
                id: {
                    [Op.eq]: groupId
                }
            } 
        });
    }
    return await getAllGroup();
}


module.exports = {
    getAllGroup,
    getOneGroup,
    createGroup,
    updateGroup,
    deleteGroup
}