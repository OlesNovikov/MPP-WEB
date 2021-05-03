import bodyParser from 'body-parser';
import { router } from './routes.js';
import express from 'express';
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
    type Query {
        registerUser(email: String!, username: String!, password: String!): String,
        loginUser(email: String!, password: String!): Response,
        getUsers: String,
        getUser(token: String!): String
    }
`);

async function registration(request, response, next, isTokenRequired) {
    const obj = await userServices.registration.process(request, response, next, isTokenRequired);
    const result = JSON.stringify(obj);
    return result;
}

async function getUsers(request, response, next, isTokenRequired) {
    const obj = await userServices.getList.process(request, response, next, isTokenRequired)
    const result = JSON.stringify(obj);
    return result;
}

async function getUser(request, response, next, isTokenRequired) {
    const obj = await userServices.read.process(request, response, next, isTokenRequired)
    const result = JSON.stringify(obj);
    return result;
}

const rootResolver = {
    registerUser: (request, response, next) => {
        console.log('registerUser: ', request);
        return registration(request, response, next, false);
    },
    loginUser: async (request, response, next) => await userServices.login.process(request, response, next, false),
    getUsers: (request, response, next) => {
        console.log('getUsers: ', request);
        return getUsers(request, response, next, false);        // false --> true
    },
    getUser: async (request, response, next) => {
        console.log('getUser: ', request);
        return getUser(request, response, next, false);         // false --> true
    }
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
    // .use(router);

app.listen(port, () => {
    console.log(`Port ${port} is listening...`);
})