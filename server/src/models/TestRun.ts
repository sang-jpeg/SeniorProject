import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { TestRunType } from '../types';

class TestRun extends Model {
  public id!: string;
  public projectId!: string;
  public type!: TestRunType;
  public testCases!: string[];
  public assignedTesters!: string[];
  public status!: 'pending' | 'in-progress' | 'completed';
  public duration!: number;
  public device!: string;
  public os!: string;
  public location!: string;
  public startedAt?: Date;
  public completedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TestRun.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TestRunType)),
      allowNull: false
    },
    testCases: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
    },
    assignedTesters: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: []
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending'
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'test_runs',
    timestamps: true,
    indexes: [
      {
        fields: ['projectId']
      },
      {
        fields: ['status']
      }
    ]
  }
);

export default TestRun; 