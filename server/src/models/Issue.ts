import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Issue extends Model {
  public id!: string;
  public testRunId!: string;
  public testCaseId!: string;
  public reportedBy!: string;
  public title!: string;
  public description!: string;
  public severity!: 'low' | 'medium' | 'high' | 'critical';
  public status!: 'open' | 'in-review' | 'accepted' | 'rejected' | 'fixed';
  public attachments!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Issue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    testRunId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'test_runs',
        key: 'id'
      }
    },
    testCaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'test_cases',
        key: 'id'
      }
    },
    reportedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: false,
      defaultValue: 'medium'
    },
    status: {
      type: DataTypes.ENUM('open', 'in-review', 'accepted', 'rejected', 'fixed'),
      allowNull: false,
      defaultValue: 'open'
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  },
  {
    sequelize,
    tableName: 'issues',
    timestamps: true,
    indexes: [
      {
        fields: ['testRunId']
      },
      {
        fields: ['testCaseId']
      },
      {
        fields: ['reportedBy']
      },
      {
        fields: ['status']
      }
    ]
  }
);

export default Issue; 