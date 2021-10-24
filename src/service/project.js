'use-strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');
const Project = db.project;
const { 
    badRequestException, 
    notFoundException 
} = require('../lib/exception');
const dateUtils = require('../lib/dateUtils');

const getAllProject = async () => {
    let projects = await Project.findAll();
    if(projects == null){
        throw notFoundException({
            status: `NOT_FOUND`, 
            message: `Projects already exist!`
        });
    }
    return projects;
};

const getOneProject = async projectId => {

    let project = await Project.findOne({
        where: {
            id: {
                [Op.eq]: projectId
            }
        }
    });

    if(project == null){
        throw notFoundException({
            status: `NOT_FOUND`, 
            message: `Cannot find Project with id: ${projectId} !`
        });
    }
    return project;
};

const createProject = async data => {
    if (!data.projectName) {
        throw badRequestException({
            status: `BAD_REQUEST`,
            message: `Parameter is not exist!`
        });
    }
    const now = dateUtils.getDateTimeCurrent()
    data.createAt = now;
    data.updateAt = now;
    let result = await Project.create(data);
    return result;
};

const updateProject = async (projectId, data) => {
    const now = dateUtils.getDateTimeCurrent();
    await getOneProject(projectId);
    
    if (!data.projectName) {
        throw badRequestException({
            status: `BAD_REQUEST`, 
            message: `Parameter is not exist!`
        });
    }

    data.updateAt = now;
    await Project.update(data, {
        where: {
            id: {
                [Op.eq]: projectId
            }
        }
    });

    return await getOneProject(projectId);
};

const deleteProject = async projectId => {
    const project = await getOneProject(projectId);
    if (project) {
        await Project.destroy({
            where: {
                id: {
                    [Op.eq]: projectId
                }
            } 
        });
    }
    return await getAllProject();
}


module.exports = {
    getAllProject,
    getOneProject,
    createProject,
    updateProject,
    deleteProject
}