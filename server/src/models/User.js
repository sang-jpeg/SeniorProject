const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firebaseUid: {
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'tester', 'client'),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Tester specific fields
  testerLevel: {
    type: DataTypes.ENUM('unrated', 'rated', 'bronze', 'silver', 'gold'),
    defaultValue: 'unrated'
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  totalEarnings: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  bugAcceptanceRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  lastLocation: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  // Client specific fields
  billingInfo: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  contractDetails: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true // Soft deletes
});

// Associations will be set up in a separate index.js file
module.exports = User; 