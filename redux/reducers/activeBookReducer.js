const INITIAL_STATE = {
  file_name: '',
  book_location: undefined,
};

const activeBookReducer = (state = INITIAL_STATE, action) => {
  console.log('dummy', action);
  switch (action.type) {
    case 'ACTIVE_BOOK_FILE_NAME':
      return {
        ...state,
        file_name: action.file_name,
      };
    case 'ACTIVE_BOOK_CURRENT_PAGE_LOCATION':
      return {
        ...state,
        book_location: action.book_location,
      };
    default:
      return state;
  }
};
export default activeBookReducer;
