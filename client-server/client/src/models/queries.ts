import gql from "graphql-tag";

const POST_LOGIN = gql`
query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        content {
            user {
                password,
                id,
                username,
                email,
                updatedAt,
                createdAt
            },
            token
        },
        status
    }
}
`;

const POST_REGISTER = gql`
query RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
        content {
            user {
                password,
                id,
                username,
                email,
                updatedAt,
                createdAt
            },
            token
        },
        status
    }
}
`;

const GET_TASKS = gql`
query GetTasks($token: String) {
    tasks(token: $token) {
        content {
            id,
            title,
            description,
            filename,
            deadline,
            status {
                name,
                description
            },
            priority {
                name
            },
            author {
                id,
                username,
                email,
            },
            executor {
                id,
                username,
                email
            }
        },
        status
    }
}
`;

const GET_USERS = gql`
query GetUsers($token: String) {
    users(token: $token) {
        content {
            id,
            username,
            email
        },
        status
    }
}
`;

const GET_USER = gql`
query GetUser($token: String!) {
    user(token: $token) {
        content {
            id,
            username,
            email
        },
        status
    }
}
`;

const GET_STATUSES = gql`
query GetStatuses($token: String){
    statuses(token: $token) {
        content {
            id,
            name
        },
        status
    }
}
`;

const GET_PRIORITIES = gql`
query GetPriorities($token: String){
    priorities(token: $token) {
        content {
            id,
            name
        },
        status
    }
}
`;

const GET_TASK = gql`
query GetTask($token: String, $id: Int){
    task(token: $token, id: $id) {
        content {
            id,
            title,
            description,
            filename,
            deadline,
            priority_id,
            status_id,
            executor_id,
            author_id
        }
    }
}
`;

const POST_TASK = gql`
query CreateTask($title: String!, $status_id: Int, $description: String, $deadline: String, $author_id: Int, $executor_id: Int, $priority_id: Int, $filename: String, $token: String) {
    createTask(title: $title, status_id: $status_id, description: $description, deadline: $deadline, author_id: $author_id, executor_id: $executor_id, priority_id: $priority_id, filename: $filename, token: $token) {
        content {
            id,
            title,
            description
        },
        status
    }
}
`;

export const Queries = {
    Login: POST_LOGIN,
    Register: POST_REGISTER,
    Users: GET_USERS,
    CurrentUser: GET_USER,
    Tasks: GET_TASKS,
    Statuses: GET_STATUSES,
    Priorities: GET_PRIORITIES,
    Task: GET_TASK,
    NewTask: POST_TASK
}