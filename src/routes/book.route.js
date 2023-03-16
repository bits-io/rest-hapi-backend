const { createBook, getBookById, getAllBook, updateBook, deleteBook } = require("../handlers/book.handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: createBook
    },
    {
        method: 'get',
        path: '/books/{id}',
        handler: getBookById
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBook
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }
]

module.exports = routes