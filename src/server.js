import Hapi from 'hapi';
import { ApolloServer, AuthenticationError} from 'apollo-server-hapi';
import { schema } from './schema';
import { getUser} from './users'
const HOST = 'localhost';
const PORT = 3000;
const apolloServer = new ApolloServer({
    schema,
    debug: false,
    context: ({request}) => {
        const user = getUser(request.headers['auth'])
        if(user == null) {
            throw new AuthenticationError('Invalid user')
        }
        console.log(` Auth Header ${request.headers['auth']}`)
        return { user};
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
        console.log(`Server is running at: ${server.info.uri}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }
}

init(); 