import Hapi from 'hapi';
const HOST = 'localhost';
const PORT = 3000;

function init() {
    const server = new Hapi.server({
        host: HOST,
        port: PORT,
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Welcome'
        }
    })
    try {
        server.start();
        console.log(`Server is running at: ${server.info}`);
    } catch (err) {
        console.log(`Error while starting server: ${err.message}`)
    }

    console.log(`Server running at: ${server.info.uri}`);
}

init(); 