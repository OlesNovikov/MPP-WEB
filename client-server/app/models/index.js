import { Priority } from "./db/priority.js";
import { Status } from "./db/status.js";
import { Task } from "./db/task.js";
import { User } from "./db/user.js";

Task.belongsTo(User, {
    foreignKey: 'author_id', 
    as: 'author'
});

Task.belongsTo(User, {
    foreignKey: 'executor_id',
    as: 'executor'
});

User.hasMany(Task, {
    foreignKey: 'author_id',
});

User.hasMany(Task, {
    foreignKey: 'executor_id',
});

Task.hasOne(Priority, {
    foreignKey: 'priority_id'
});

Priority.belongsTo(Task);

Task.hasOne(Status, {
    foreignKey: 'status_id'
});

Status.belongsTo(Task);

export default { Task, User };