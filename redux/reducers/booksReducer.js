
  
import RNFS from 'react-native-fs';
import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../../constants';

const INITIAL_STATE = {
  books: [],
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BOOKS': {
      console.log('source', action.payload.url);
      console.log(
        'destination',
        `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}/${action.payload.book_name}`,
      );

      RNFS.mkdir(
        `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`,
      ).then((success) => {
        RNFS.writeFile(
          `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}/${action.payload.book_name}`,
          'Lorem ipsum dolor sit amet',
          'utf8',
        )
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
      });

      return Object.assign({}, state, {
        books: state.books.concat({
          url: action.payload.url,
          book_name: action.payload.book_name,
        }),
      });
      // return state.books.concat([action.payload]);
    }
    case 'REMOVE_BOOKS': {
      let newState = [...state];
      newState.splice(action.payload, 1);
      return newState;
    }
    default:
      return state;
  }
};
export default booksReducer;