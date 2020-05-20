import Hapi from 'hapi';
import { ApolloServer } from 'apollo-server-hapi';
import { schema } from './schema';
const HOST = 'localhost';
const PORT = 3000;
const apolloServer = new ApolloServer({
    schema
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
        console.log(`Server is running at: ${server}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }

    console.log(`Server running at: ${server.info.uri}`);
}

init(); 