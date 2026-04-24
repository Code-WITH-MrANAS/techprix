const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    company: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    role: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      enum: {
        values: [1, 2, 3, 4, 5],
        message: 'Rating must be between 1 and 5',
      },
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
      minlength: [10, 'Review must be at least 10 characters'],
    },
    service: {
      type: String,
      enum: {
        values: [
          'Web Development',
          'Mobile Apps',
          'Digital Marketing',
          'Brand & Design',
          'SEO Optimization',
          '3D Web Experience',
          'Other',
        ],
        message: '{VALUE} is not a valid service',
      },
      default: 'Other',
    },
    approved: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
