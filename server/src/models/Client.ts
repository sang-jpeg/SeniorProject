import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class Client extends Model {
  public id!: string;
  public company!: string;
  public industry!: string;
  public subscription!: {
    plan: string;
    status: string;
    expiresAt: Date;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscription: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        plan: 'free',
        status: 'active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    }
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: true
  }
);

// Set up association
User.hasOne(Client);
Client.belongsTo(User);

export default Client; 