import Hapi from 'hapi';
import { ApolloServer, AuthenticationError } from 'apollo-server-hapi';
import { typeDefs} from './typeDef'
import { resolvers} from './resolver'
const HOST = 'localhost';
const PORT = 3000;

const apolloServer = new ApolloServer({
    typeDefs, resolvers
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