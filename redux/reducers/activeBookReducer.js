const INITIAL_STATE = {
  file_name: '',
  book_location: undefined,
  selected_word: undefined,
  meanings: undefined,
  author_name: '',
  book_name: '',
  selected_sentence: '',
  selected_paragraph: '',
  images: [],
};

const activeBookReducer = (state = INITIAL_STATE, action) => {
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
    case 'ACTIVE_BOOK_SELECTED_PARAGRAPH':
      return {
        ...state,
        selected_paragraph: action.selected_paragraph,
      };
    case 'ACTIVE_BOOK_SELECTED_SENTENCE':
      return {
        ...state,
        selected_sentence: action.selected_sentence,
      };
    case 'ACTIVE_BOOK_SELECTED_WORD_MEANINGS':
      return {
        ...state,
        meanings: action.meanings,
      };
    case 'ACTIVE_BOOK_SELECTED_WORD_IMAGES':
      return {
        ...state,
        images: action.images,
      };
    case 'ACTIVE_BOOK_NAME':
      return {
        ...state,
        book_name: action.book_name,
      };
    case 'ACTIVE_BOOK_AUTHOR_NAME':
      return {
        ...state,
        author_name: action.author_name,
      };
    default:
      return state;
  }
};
export default activeBookReducer;
