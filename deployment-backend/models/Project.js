const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Web Development', 'Mobile App', 'Digital Marketing', 'Brand & Design', 'Other'],
      required: true,
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    link: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
