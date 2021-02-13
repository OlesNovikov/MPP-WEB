import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Tag = sequelize.define('tags', 
{
  name: {
    type: DataTypes.STRING,
    allowNull: false
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

console.log(Tag === sequelize.models.Tag);