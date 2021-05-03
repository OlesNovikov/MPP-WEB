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
    getUsers() {
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

const GET_USER = gql``;

export const Queries = {
    Login: POST_LOGIN,
    Register: POST_REGISTER,
    Users: GET_USERS,
    CurrentUser: GET_USER
}