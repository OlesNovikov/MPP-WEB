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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'Status',
    tableName: 'statuses'
})