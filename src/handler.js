/* eslint-disable no-console */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint no-else-return: "error" */

const { nanoid } = require('nanoid');
const books = require('./books');

module.exports = {
  addBook(request, h) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.header('content-type', 'application/json');
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.header('content-type', 'application/json');
      response.code(400);
      return response;
    }
    const id = nanoid(11);
    const insertedAt = new Date().toISOString();
    books.push({
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      insertedAt,
      updatedAt: insertedAt,
    });
    const idSuccess = books.some((e) => e.id === id);
    if (idSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.header('content-type', 'application/json');
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  },
  getBook(request, h) {
    const { name, reading, finished } = request.query;
    const resultQuery = [];
    if (books.length < 0) {
      const response = h.response({
        status: 'success',
        data: {
          books,
        },
      });
      response.header('content-type', 'application/json');
      response.code(200);
      return response;
    }
    if (name) {
      // eslint-disable-next-line array-callback-return, consistent-return
      books.forEach((e) => {
        if (e.name.toLowerCase().includes(name.toLowerCase())) {
          resultQuery.push({
            id: e.id,
            name: e.name,
            publisher: e.publisher,
          });
        }
      });
      const response = h.response({
        status: 'success',
        data: {
          books: resultQuery,
        },
      });
      response.header('content-type', 'application/json');
      response.code(200);
      return response;
    } else if (reading) {
      if (reading === '0') {
        books.forEach((e) => {
          if (!e.reading) {
            resultQuery.push({
              id: e.id,
              name: e.name,
              publisher: e.publisher,
            });
          }
        });
        const response = h.response({
          status: 'success',
          data: {
            books: resultQuery,
          },
        });
        response.header('content-type', 'application/json');
        response.code(200);
        return response;
      } else if (reading === '1') {
        books.forEach((e) => {
          if (e.reading) {
            resultQuery.push({
              id: e.id,
              name: e.name,
              publisher: e.publisher,
            });
          }
        });
        const response = h.response({
          status: 'success',
          data: {
            books: resultQuery,
          },
        });
        response.header('content-type', 'application/json');
        response.code(200);
        return response;
      }
    } else if (finished) {
      if (finished === '0') {
        books.forEach((e) => {
          if (!e.finished) {
            resultQuery.push({
              id: e.id,
              name: e.name,
              publisher: e.publisher,
            });
          }
        });
        const response = h.response({
          status: 'success',
          data: {
            books: resultQuery,
          },
        });
        response.header('content-type', 'application/json');
        response.code(200);
        return response;
      } else if (finished === '1') {
        books.forEach((e) => {
          if (e.finished) {
            resultQuery.push({
              id: e.id,
              name: e.name,
              publisher: e.publisher,
            });
          }
        });
        const response = h.response({
          status: 'success',
          data: {
            books: resultQuery,
          },
        });
        response.header('content-type', 'application/json');
        response.code(200);
        return response;
      }
    }
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((e) => ({
          id: e.id,
          name: e.name,
          publisher: e.publisher,
        })),
      },
    });
    response.header('content-type', 'application/json');
    response.code(200);
    return response;
  },
  getDetailBook(request, h) {
    const { bookId } = request.params;
    const index = books.findIndex((e) => e.id === bookId);
    if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.header('content-type', 'application/json');
      response.code(404);
      return response;
    }
    const response = h.response({
      status: 'success',
      data: {
        book: books[index],
      },
    });
    response.header('content-type', 'application/json');
    response.code(200);
    return response;
  },
  updateBook(request, h) {
    const { bookId } = request.params;
    const index = books.findIndex((e) => e.id === bookId);
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.header('content-type', 'application/json');
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.header('content-type', 'application/json');
      response.code(400);
      return response;
    } else if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.header('content-type', 'application/json');
      response.code(404);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.header('content-type', 'application/json');
    response.code(200);
    return response;
  },
  deleteBook(request, h) {
    const { bookId } = request.params;
    const index = books.findIndex((e) => e.id === bookId);
    if (index === -1) {
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.header('content-type', 'application/json');
      response.code(404);
      return response;
    }
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.header('content-type', 'application/json');
    response.code(200);
    return response;
  },
};
