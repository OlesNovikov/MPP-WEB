import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [8, 16],
    get() {
      return null;
    }
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
    modelName: 'User',
    tableName: 'users'
});
