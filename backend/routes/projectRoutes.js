const express = require('express');
const { getProjects, getProject } = require('../controllers/projectController');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

module.exports = router;
