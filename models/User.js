const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'clinic'],
    required: [true, 'Please select a role']
  },
  // Common optional fields
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+201[0-9]{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid Egyptian phone number!`
    }
  },
  // Patient specific fields
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,
    trim: true
  },
  insuranceProvider: {
    type: String,
    trim: true
  },
  // Provider specific fields
  clinicName: {
    type: String,
    required: function() { return this.role === 'clinic' }
  },
  specialty: {
    type: String,
    required: function() { return this.role === 'doctor' || this.role === 'clinic' },
    enum: [
      'Cardiology',
      'Dermatology',
      'Endocrinology',
      'Gastroenterology',
      'General Practice',
      'Neurology',
      'Obstetrics & Gynecology',
      'Ophthalmology',
      'Orthopedics',
      'Pediatrics',
      'Psychiatry',
      'Urology'
    ]
  },
  location: {
    type: String,
    required: function() { return this.role === 'doctor' || this.role === 'clinic' }
  },
  website: {
    type: String,
    trim: true
  },
  licenseNumber: {
    type: String,
    trim: true
  },
  contactInfo: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 