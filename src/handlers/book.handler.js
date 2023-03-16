const { nanoid } = require("nanoid")
const { successResponse, errorResponse, failResponse } = require("../helpers/response.helper")
const books = require("../libraries/books")


// Method GET
// Route books
const getAllBook = async (req, h) => {
    try {
        const { finished, reading } = req.query
        const name = req.query.name || ""
        let book = books.map((book) => ({
            id : book.id,
            name: book.name,
            publisher: book.publisher
        }))     

        if (name) {
            book = books.filter( book => 
                book.name.toLowerCase().includes(name.toLowerCase())).map((book) => ({
                    id : book.id,
                    name: book.name,
                    publisher: book.publisher
                }))     
        }
        if (finished) {
            book = books.filter( book => 
                Number(book.finished) === Number(finished) ).map((book) => ({
                    id : book.id,
                    name: book.name,
                    publisher: book.publisher
                }))     
        }
        if (reading) {
            book = books.filter( book => 
                Number(book.reading) === Number(reading)).map((book) => ({
                    id : book.id,
                    name: book.name,
                    publisher: book.publisher
                }))     
        }
        

        const data = {
            books: book
        } 
        return h.response(successResponse('Show All Book', data, 200)).code(200);
    } catch (error) {
        console.log(error);
        return h.response(errorResponse('Something error')).code(500);
    }
}

// Method GET
// Route books/{id}
const getBookById = async (req, h) => {
    try {
        const id = req.params.id

        const book = books.filter(book => book.id === id)[0]
        
        if (!book) return h.response(failResponse('Buku tidak ditemukan')).code(404)

        const data = {
            book
        } 
        return h.response(successResponse(undefined, data)).code(200)
    } catch (error) {
        return h.response(errorResponse('Something error')).code(500)
    }
}

// Method PUT
// Route books{id}
const updateBook = async (req, h) => {
    try {
        const id = req.params.id
        const {
            name, year, author, summary, publisher, pageCount, readPage, reading
        } = req.payload

        if (!name) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi nama buku')).code(400)
        }
        if (!year) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi tahun buku')).code(400)
        }
        if (typeof(year) != 'number') {
            return h.response(failResponse('Gagal memperbarui buku. Tahun buku harus berupa angka')).code(400)
        }
        if (!author) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi penulis buku')).code(400)
        }
        if (!summary) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi ringkasan buku')).code(400)
        }
        if (!publisher) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi penerbit buku')).code(400)
        }
        if (!pageCount) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi jumlah halaman buku')).code(400)
        }
        if (typeof(pageCount) != 'number') {
            return h.response(failResponse('Gagal memperbarui buku. Jumlah halaman buku harus berupa angka')).code(400)
        }
        if (!readPage) {
            return h.response(failResponse('Gagal memperbarui buku. Mohon isi halaman terbaca buku')).code(400)
        }
        if (typeof(readPage) != 'number') {
            return h.response(failResponse('Gagal memperbarui buku. Halaman terbaca buku harus berupa angka')).code(400)
        }
        if (typeof(reading) != 'boolean') {
            return h.response(failResponse('Gagal memperbarui buku. baca buku harus berupa boolean')).code(400)
        }

        const index = books.findIndex((book) => book.id === id);

        if (index === -1) return h.response(failResponse('Gagal memperbarui buku. Id tidak ditemukan')).code(404)

        if (!name) return h.response(failResponse('Gagal memperbarui buku. Mohon isi nama buku')).code(400)
        
        if (readPage > pageCount) return h.response(failResponse('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')).code(400)
        
        const finished = pageCount == readPage ? true : false;
        const updatedAt = new Date().toISOString()

        books[index] = {
            ...books[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage,
            finished, 
            reading, 
            updatedAt
        }


        return h.response(successResponse('Buku berhasil diperbarui')).code(200)
    } catch (error) {
        return h.response(errorResponse('Something error')).code(500)
    }
}

// Method POST
// Route books
const createBook = async (req, h) => {
    try {
        const {
            name, year, author, summary, publisher, pageCount, readPage, reading
        } = req.payload

        if (!name) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi nama buku')).code(400)
        }
        if (!year) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi tahun buku')).code(400)
        }
        if (typeof(year) != 'number') {
            return h.response(failResponse('Gagal menambahkan buku. Tahun buku harus berupa angka')).code(400)
        }
        if (!author) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi penulis buku')).code(400)
        }
        if (!summary) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi ringkasan buku')).code(400)
        }
        if (!publisher) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi penerbit buku')).code(400)
        }
        if (!pageCount) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi jumlah halaman buku')).code(400)
        }
        if (typeof(pageCount) != 'number') {
            return h.response(failResponse('Gagal menambahkan buku. Jumlah halaman buku harus berupa angka')).code(400)
        }
        if (!readPage) {
            return h.response(failResponse('Gagal menambahkan buku. Mohon isi halaman terbaca buku')).code(400)
        }
        if (typeof(readPage) != 'number') {
            return h.response(failResponse('Gagal menambahkan buku. Halaman terbaca buku harus berupa angka')).code(400)
        }
        if (typeof(reading) != 'boolean') {
            return h.response(failResponse('Gagal menambahkan buku. baca buku harus berupa boolean')).code(400)
        }

        const id = nanoid()
        const insertedAt = new Date().toISOString()
        const updatedAt = insertedAt
        

        if (readPage > pageCount) {
            return h.response(failResponse('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')).code(400)
        }
        const finished = pageCount == readPage ? true : false;

        books.push({
            id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
        })
        const data = {
            bookId: id
        }
        return h.response(successResponse('Buku berhasil ditambahkan', data)).code(201)
    } catch (error) {
        return h.response(errorResponse('Buku gagal ditambahkan')).statusCode(500).code(500)
    }
}

// Method DELETE
// Route books/{id}
const deleteBook = async (req, h) => {
    try {
        const id = req.params.id
        const index = books.findIndex((book) => book.id === id);
        if (index === -1) return h.response(failResponse('Buku gagal dihapus. Id tidak ditemukan')).code(404)
        
        books.splice(index, 1);
        return h.response(successResponse('Buku berhasil dihapus')).code(200)
    } catch (error) {
        return h.response(errorResponse('Something error')).code(500)
    }
}

module.exports = {
    getAllBook, getBookById, updateBook, createBook, deleteBook
}