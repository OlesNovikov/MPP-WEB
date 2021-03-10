import { Priority } from "./db/priority.js";
import { Status } from "./db/status.js";
import { Task } from "./db/task.js";
import { User } from "./db/user.js";
import { Tag } from './db/tag.js';

Task.belongsTo(User, {
    foreignKey: 'author_id', 
    as: 'author'
});

User.hasMany(Task, {
    foreignKey: 'author_id',
});

Task.belongsTo(User, {
    foreignKey: 'executor_id',
    as: 'executor'
});

User.hasMany(Task, {
    foreignKey: 'executor_id',
});

Task.belongsTo(Status, {
    foreignKey: 'status_id',
    as: 'status'
});

Status.hasOne(Task, {
    foreignKey: 'status_id',
});

Task.belongsTo(Priority, {
    foreignKey: 'priority_id',
    as: 'priority'
});

Priority.hasOne(Task, {
    foreignKey: 'priority_id',
});

Task.belongsToMany(Tag, {
    through: 'tasks_tags'
});

Tag.belongsToMany(Task, {
    through: 'tasks_tags'
});

export default { Task, User, Status, Priority };