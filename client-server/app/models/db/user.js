import pkg from 'sequelize';
const { Sequelize, DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

/*export class User extends Model {}

User.init({
  nickname: {
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
  },
  createdAt: {
    type: DataTypes.DATE(6),
    field: 'created_at',
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE(6),
    field: 'updated_at',
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  }
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'User',
    tableName: 'users'
})*/

const sequelize = DbConnector.getSequelize();
export const User = sequelize.define('User', {
  nickname: {
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
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  }
}, {
  sequelize: DbConnector.getSequelize(),
  modelName: 'User',
  tableName: 'users'
})

/*module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }
  
  return User;
};*/
