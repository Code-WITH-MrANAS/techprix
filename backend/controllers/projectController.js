const Project = require('../models/Project');

// @desc    Get all active projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;
    
    const filter = { active: true };
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(featured === 'true' ? 6 : 100);

    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects.',
    });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project.',
    });
  }
};

module.exports = {
  getProjects,
  getProject,
};
