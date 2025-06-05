const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TestCase = sequelize.define('TestCase', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('functional', 'security', 'performance', 'accessibility', 'localization'),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    allowNull: false
  },
  preconditions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  steps: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  expectedResults: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  testData: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('active', 'deprecated', 'draft'),
    defaultValue: 'active'
  },
  automationStatus: {
    type: DataTypes.ENUM('not-automated', 'automated', 'in-progress'),
    defaultValue: 'not-automated'
  },
  estimatedDuration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true
});

const TestCaseTemplate = sequelize.define('TestCaseTemplate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('functional', 'security', 'performance', 'accessibility', 'localization'),
    allowNull: false
  },
  structure: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

const TestCaseImport = sequelize.define('TestCaseImport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  importedCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  failedCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  errors: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  mappingConfig: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = {
  TestCase,
  TestCaseTemplate,
  TestCaseImport
}; 