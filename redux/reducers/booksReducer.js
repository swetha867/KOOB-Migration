import RNFS from 'react-native-fs';
import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../../constants';

const INITIAL_STATE = {
  books: [],
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BOOK_ADDED': {
      console.log('Got payload', action.payload);
      return Object.assign({}, state, {
        books: state.books.concat({
          file_name: action.payload.file_name,
          title: action.payload.book_title,
        }),
      });
    }
    case 'BOOK_REMOVED': {
      let newState = [...state];
      newState.splice(action.payload, 1);
      return newState;
    }
    default:
      return state;
  }
};
export default booksReducer;
