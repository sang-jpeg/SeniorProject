const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certification = sequelize.define('Certification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      'security',
      'performance',
      'load',
      'functional',
      'accessibility',
      'localization'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requiredScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  questions: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in minutes
    allowNull: false
  },
  validityPeriod: {
    type: DataTypes.INTEGER, // Validity in months
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

// TesterCertification join table
const TesterCertification = sequelize.define('TesterCertification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('passed', 'failed', 'expired'),
    allowNull: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: true
});

module.exports = {
  Certification,
  TesterCertification
}; 