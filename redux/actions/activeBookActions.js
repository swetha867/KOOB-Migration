export const setActiveBookFileName = (file_name) => ({
  type: 'ACTIVE_BOOK_FILE_NAME',
  file_name,
});

export const setActiveBookLocation = (current_book_location) => ({
  type: 'ACTIVE_BOOK_CURRENT_PAGE_LOCATION',
  current_book_location,
});
