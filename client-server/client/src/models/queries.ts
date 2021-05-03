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

const GET_USERS = gql`
query GetUsers() {
    users() {
        content {
            user {
                password,
                id,
                username,
                email
            }
        },
        status
    }
}
`;

const GET_TASKS = gql`
query GetTasks() {
    tasks() {
        content {
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

const GET_USER = gql`
    query GetUser() {
        tasks() {
            content {
                id,
                username,
                email
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
    Tasks: GET_TASKS
}