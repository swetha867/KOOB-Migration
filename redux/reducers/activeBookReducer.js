const INITIAL_STATE = {
  file_name: '',
  book_location: undefined,
  selected_word: undefined,
  dictionary_data: [],
};

const activeBookReducer = (state = INITIAL_STATE, action) => {
  console.log(`Recieved ${JSON.stringify(action)}`);
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
    case 'ACTIVE_BOOK_SELECTED_WORD':
      return {
        ...state,
        selected_word: action.selected_word,
      };
    case 'ACTIVE_BOOK_SELECTED_WORD_MEANINGS':
      return {
        ...state,
        dictionary_data: action.dictionary_data,
      };
    default:
      return state;
  }
};
export default activeBookReducer;
