'use-strict';

const groupController = require("../controllers/group");
const express = require('express');
const router = express.Router();

router.get('/groups',  groupController.getAllGroup);
router.get('/group/:id', groupController.getOneGroup);
router.post('/group', groupController.createGroup);
router.put('/group/:id', groupController.updateGroup);
router.delete('/group/:id', groupController.deleteGroup);

module.exports = router;