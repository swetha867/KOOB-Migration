export const addBook = (url, book_name) => ({
  type: 'ADD_BOOKS',
  payload: {url: url, book_name: book_name},
});
