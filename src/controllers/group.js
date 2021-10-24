'use-strict';

const groupService = require('../service/group');

const getAllGroup = async (req, res) => {
    try {
        let result = await groupService.getAllGroup();
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const getOneGroup = async (req, res) => {
    try {
        let result = await groupService.getOneGroup(req.params.id);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return res.status(404).json({
            Error: error
        });
    }
};

const createGroup = async (req, res) => {
    try {
        const data = {
            roleGroup: req.body.role,
            groupName: req.body.name
        };
        let result = await groupService.createGroup(data);
        return res.status(200).json({
            data: result
        });
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const updateGroup = async (req, res) => {
    try {
        const data = {
            roleGroup: req.body.role,
            groupName: req.body.name
        };
        let result = await groupService.updateGroup(req.params.id, data);
        return res.status(200).json({
            data: result
        })
    } catch (error) {
        return  res.status(400).json({
            Error: error
        });
    }
};

const deleteGroup = async (req, res) => {
    try {
        let result = await groupService.deleteGroup(req.params.id);
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
    getAllGroup,
    getOneGroup,
    createGroup,
    updateGroup,
    deleteGroup
}