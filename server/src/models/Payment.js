const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('tester-payment', 'client-invoice'),
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  periodStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  periodEnd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true
});

const PaymentDetail = sequelize.define('PaymentDetail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  paymentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  testCycleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  hoursWorked: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  bonusAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  deductions: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('bank-account', 'paypal', 'stripe'),
    allowNull: false
  },
  details: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  lastUsed: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = {
  Payment,
  PaymentDetail,
  PaymentMethod
};