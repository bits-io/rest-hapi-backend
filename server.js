const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/book.route');


const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
        cors: true
    },
});

const init = async () => {



     //Index
    server.route({
        method: 'GET',
        path: '/',
        handler: (res, h) => {
            return `
            <h1>Hello Bookshelf API</h1>
            <p>This is Submission Backend Beginner Dicoding by Dobith</p>
            `;
        }
    });

    server.route(routes)

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();