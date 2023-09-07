/* eslint-disable no-console */
/* eslint linebreak-style: ["error", "windows"] */

const {
  addBook, getBook, getDetailBook, updateBook, deleteBook,
} = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  }, {
    method: 'GET',
    path: '/books',
    handler: getBook,
  }, {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailBook,
  }, {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  }, {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];
