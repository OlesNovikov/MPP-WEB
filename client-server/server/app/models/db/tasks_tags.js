import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import { DbConnector } from '../../configurations/dbConnector.js';

export class TasksTags extends Model {}

TasksTags.init({
    task_id: {
        type: DataTypes.INTEGER,
        field: 'task_id',
        allowNull: false
    },
    tag_id: {
        type: DataTypes.INTEGER,
        field: 'tag_id',
        allowNull: false 
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
    modelName: 'Tasks_Tags',
    tableName: 'tasks_tags'
})