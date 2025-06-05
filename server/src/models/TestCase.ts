import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class TestCase extends Model {
  public id!: string;
  public projectId!: string;
  public title!: string;
  public description!: string;
  public steps!: string[];
  public expectedResult!: string;
  public priority!: 'low' | 'medium' | 'high';
  public createdBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TestCase.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: []
    },
    expectedResult: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium'
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'test_cases',
    timestamps: true,
    indexes: [
      {
        fields: ['projectId']
      },
      {
        fields: ['createdBy']
      }
    ]
  }
);

export default TestCase; 