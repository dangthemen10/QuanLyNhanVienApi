'use-strict';

const projectController = require("../controllers/project");
const express = require('express');
const router = express.Router();

router.get('/projects',  projectController.getAllProject);
router.get('/project/:id', projectController.getOneProject);
router.post('/project', projectController.createProject);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);

module.exports = router;