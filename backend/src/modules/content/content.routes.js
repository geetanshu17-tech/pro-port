
const express = require('express');
const router = express.Router();

const contentController = require('./content.controller');

router.get('/', contentController.getProjects);
router.post('/', contentController.createProject);

module.exports = router;
