import { Sequelize, DataTypes, Model } from 'sequelize';
import { DbConnector } from '../../configurations/dbConnector';

export class Status extends Model {}

Status.init({
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
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'Status',
    tableName: 'statuses'
})

console.log(Status === sequelize.models.Status);