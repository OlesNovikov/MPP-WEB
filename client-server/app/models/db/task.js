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