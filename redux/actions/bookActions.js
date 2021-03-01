export const addBook = (book_title, file_name) => ({
  type: 'BOOK_ADDED',
  payload: {book_title, file_name},
});
