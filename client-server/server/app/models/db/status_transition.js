import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class StatusTransition extends Model {}

StatusTransition.init({
  src_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dest_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at',
  }
}, {
    sequelize: DbConnector.getSequelize(),
    modelName: 'StatusTransition',
    tableName: 'status_transitons'
})