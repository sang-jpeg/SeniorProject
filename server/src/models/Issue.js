const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Issue = sequelize.define('Issue', {
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
    allowNull: true
  },
  reporterId: {
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
  severity: {
    type: DataTypes.ENUM('critical', 'high', 'medium', 'low'),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('critical', 'high', 'medium', 'low'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'in-review', 'accepted', 'rejected', 'duplicate', 'fixed', 'closed'),
    defaultValue: 'open'
  },
  environment: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      os: '',
      browser: '',
      device: '',
      version: ''
    }
  },
  stepsToReproduce: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  expectedResult: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  actualResult: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  attachments: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  reviewerId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  reviewNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true
});

const IssueComment = sequelize.define('IssueComment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  issueId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  attachments: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  timestamps: true
});

const IssueHistory = sequelize.define('IssueHistory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  issueId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  field: {
    type: DataTypes.STRING,
    allowNull: false
  },
  oldValue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  newValue: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = {
  Issue,
  IssueComment,
  IssueHistory
}; 