import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class Task extends Model {}

Task.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  executor_id: {
    type: DataTypes.INTEGER,
  },
  priority_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: false,
  }
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'Task',
    tableName: 'tasks'
});