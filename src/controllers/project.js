'use-strict';

const projectService = require('../service/project');

const getAllProject = async (req, res) => {
    try {
        let result = await projectService.getAllProject();
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const getOneProject = async (req, res) => {
    try {
        let result = await projectService.getOneProject(req.params.id);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const createProject = async (req, res) => {
    try {
        const data = {
            projectName: req.body.name
        };
        let result = await projectService.createProject(data);
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const data = {
            projectName: req.body.name
        };
        let result = await projectService.updateProject(req.params.id, data);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        let result = await projectService.deleteProject(req.params.id);
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
    getAllProject,
    getOneProject,
    createProject,
    updateProject,
    deleteProject
}