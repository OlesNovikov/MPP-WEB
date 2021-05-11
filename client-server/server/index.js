import bodyParser from 'body-parser';
import { router } from './routes.js';
import express, { request, response } from 'express';
import cors from 'cors';
import { priorityServices, statusSerivces, taskServices, userServices } from './app/services/index.js';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const schema = buildSchema(`
    type User {
        password: String,
        id: Int!,
        username: String!,
        email: String!,
        updatedAt: String!,
        createdAt: String!
    },
    type Status {
        id: Int,
        name: String,
        description: String,
        createdAt: String,
        updatedAt: String
    },
    type Priority {
        id: Int,
        name: String,
        createdAt: String,
        updatedAt: String
    },
    type Task {
        id: Int,
        title: String,
        description: String,
        filename: String,
        deadline: String,
        priority: Priority,
        status: Status,
        author: User,
        executor: User,
        createdAt: String,
        updatedAt: String,
    },
    type CreatedTask {
        id: Int,
        title: String,
        description: String,
        filename: String,
        deadline: String,
        priority_id: Int,
        status_id: Int,
        author_id: Int,
        executor_id: Int,
        createdAt: String,
        updatedAt: String,
    },
    type TaskInfo {
        content: CreatedTask,
        status: Int
    },
    type UserToken {
        user: User,
        token: String
    },
    type Response {
        content: UserToken,
        status: Int!
    },
    type TaskResponse {
        content: Task,
        status: Int!
    },
    type Users {
        content: [User],
        status: Int!
    },
    type Tasks {
        content: [Task],
        status: Int!
    },
    type Priorities {
        content: [Priority],
        status: Int!
    },
    type Statuses {
        content: [Status],
        status: Int!
    },
    type CurrentUser {
        content: User,
        status: Int!
    },
    type Query {
        registerUser(email: String!, username: String!, password: String!): Response,
        loginUser(email: String!, password: String!): Response,
        users(token: String): Users,
        user(token: String): CurrentUser,
        tasks(token: String): Tasks,
        task(token: String, id: Int): TaskInfo,
        createTask(title: String!, status_id: Int, description: String, deadline: String, author_id: Int, executor_id: Int, priority_id: Int, filename: String, token: String): TaskResponse,
        priorities(token: String): Priorities,
        statuses(token: String): Statuses
    }
`);

const rootResolver = {
    registerUser: async (request, response, next) => await userServices.registration.process(request, response, next, false),
    loginUser: async (request, response, next) => await userServices.login.process(request, response, next, false),
    users: async (request, response, next) => await userServices.getList.process(request, response, next),
    user: async (request, response, next) => await userServices.read.process(request, response, next),
    tasks: async (request, response, next) => await taskServices.getList.process(request, response, next),
    createTask: async (request, response, next) => await taskServices.create.process(request, response, next),
    task: async (request, response, next) => await taskServices.read.process(request, response, next),
    priorities: async (request, response, next) => await priorityServices.getList.process(request, response, next),
    statuses: async (request, response, next) => await statusSerivces.getList.process(request, response, next)
}

const graphql = graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphql: true,
});

const port = 1234;
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use('/graphql', graphql)
    .use(router);

app.listen(port, () => {
    console.log(`Port ${port} is listening...`);
})