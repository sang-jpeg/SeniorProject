const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
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
    allowNull: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'on-hold', 'cancelled'),
    defaultValue: 'active'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  }
}, {
  timestamps: true,
  paranoid: true
});

const TestCycle = sequelize.define('TestCycle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('sanity', 'smoke', 'regression'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'draft'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  requirements: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      location: [],
      devices: [],
      os: [],
      testingTypes: []
    }
  },
  assignedTestLead: {
    type: DataTypes.UUID,
    allowNull: true
  },
  maxTesters: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hourlyBudget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true
});

const TestCaseExecution = sequelize.define('TestCaseExecution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  testCycleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  testCaseId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  testerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'passed', 'failed', 'blocked'),
    defaultValue: 'pending'
  },
  result: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timeSpent: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = {
  Project,
  TestCycle,
  TestCaseExecution
}; 