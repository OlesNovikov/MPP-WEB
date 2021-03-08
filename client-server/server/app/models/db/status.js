import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class Status extends Model {}

Status.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at',
  }
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'Status',
    tableName: 'statuses'
})