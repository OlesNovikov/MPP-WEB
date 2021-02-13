import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Priority = sequelize.define('priorities', 
{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

console.log(Priority === sequelize.models.Priority);