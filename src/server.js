import Hapi from 'hapi';
import { ApolloServer, AuthenticationError } from 'apollo-server-hapi';
import { getUser } from './users'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
const HOST = 'localhost';
const PORT = 3000;

const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    debug: false,
    context: ({ request }) => {
        const user = getUser(request.headers['authorization'])
        if (user == null) {
            throw new AuthenticationError('Invalid user')
        }
        return { user };
    }
})
function init() {
    const server = new Hapi.server({
        host: HOST,
        port: PORT,
    });
    apolloServer.applyMiddleware({ app: server })
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Welcome'
        }
    })
    try {
        server.start();
        console.log(`Server is running at: ${JSON.stringify(server.info.uri)}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }
}

init(); 