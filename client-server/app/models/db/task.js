import pkg from 'sequelize';
const { Sequelize, DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class Task {
    constructor(id, title, description, file, status, deadline, created, author, executor, priority, tags) {
        this.id = id || null;
        this.status = status || null;
        this.deadline = deadline || null;
        this.description = description || null;
        this.title = title || null;
        this.file = file || null;
        this.created_at = created || null;
        this.updated_at = updated || null;
        this.author = author || null;
        this.executor = executor || null;
        this.priority = priority || null;
        this.tags = tags || [];
    }
}


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
  tags: {
    type: DataTypes.STRING,
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
})
