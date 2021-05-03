import bodyParser from 'body-parser';
import { router } from './routes.js';
import express, { request, response } from 'express';
import cors from 'cors';
import { userServices } from './app/services/index.js';
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
    type UserToken {
        user: User,
        token: String
    },
    type Response {
        content: UserToken,
        status: Int!
    },
    type Users {
        content: [User],
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
        user(token: String): CurrentUser
    }
`);

const rootResolver = {
    registerUser: async (request, response, next) => await userServices.registration.process(request, response, next, false),
    loginUser: async (request, response, next) => await userServices.login.process(request, response, next, false),
    users: async (request, response, next) => await userServices.getList.process(request, response, next, true),
    user: async (request, response, next) => await userServices.read.process(request, response, next, true),
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
    .use('/graphql', graphql);

app.listen(port, () => {
    console.log(`Port ${port} is listening...`);
})