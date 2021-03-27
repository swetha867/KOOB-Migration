import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../../constants';
import {addBook} from './bookActions';
import {logger} from '../../utils/logger';
import {setWordMeanings, setWordImages} from './activeBookActions';

export function addBookAsyncAction(url, book_title) {
  return function (dispatch) {
    const book_uuid = uuidv4();
    const source_file_path = url;
    const destination_folder_path = `${RNFS.DocumentDirectoryPath}/${EPUB_IMPORT_LOCAL_DIR_NAME}`;
    const uuid_file_name = `${book_uuid}.epub`;
    const destination_file_path = `${destination_folder_path}/${uuid_file_name}`;
    logger.debug('source', source_file_path);
    logger.debug('destination', destination_file_path);
    return RNFS.mkdir(destination_folder_path).then(() => {
      logger.debug(`Ensuring that ${destination_folder_path} exists`);
      return RNFS.copyFile(source_file_path, destination_file_path)
        .then(() => {
          logger.debug(`Importing ${book_title} completed succesfully`);
          dispatch(addBook(book_title, uuid_file_name));
        })
        .catch((err) => {
          logger.error(err.message);
        });
    });
  };
}
export function fetchImages(word) {
  return function (dispatch) {
    return new Promise((resolve) => {
      axios({
        url: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + 'squares',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'x-token': 'ff3ee169-7459-4651-bd99-e3324d3d5309',
        },
      }).then(function (response) {
        dispatch(setWordImages(response));
        resolve();
      });
    });
  };
}
export function fetchMeanings(word, user_id, sentence, paragraph, book_name, author_name) {
  return function (dispatch) {
    return new Promise((resolve) => {
      axios({
        url: 'http://3.15.37.149:6010/lookup',
        method: 'POST',
        data: {
          // word,
          // paragraph,
          // sentence,
          // bookId,
          word: 'squares',
          user_id: '20',
          sentence: 'Kinship was an assertion',
          book_name: 'Reading with Patrick',
          author_name: 'Michelle Kuo',
          paragraph:
            'Helena had begun an effort to market an enchanting part of its history, the blues, at the old train depot, which was converted to a museum. The museum shares stories and photos of black musicians who sang in Helena, lived in Helena, visited Helena, used Helena as a stepping-stone to Chicago, or retired in Helena when Chicago didn’t work out. Their names are evocative, often involving infirmity or animals: Blind Lemon Jefferson, Howlin’ Wolf, Super Chikan. Exhibits here have hopeful titles—A Heritage of Determination, reads one, or Struggle in a Bountiful Land—but few visitors.',
        },
        headers: {
          'Content-Type': 'application/json',
          //'x-token': 'ff3ee169-7459-4651-bd99-e3324d3d5309',
        },
      }).then(function (response) {
        dispatch(setWordMeanings(response.data));
        resolve();
      });
    });
  };
}
/*
 type: "POST",
        url: "http://3.15.37.149:6010/votes",
        data: {
          user_id: window.localStorage.getItem('reader_user_id'),
          meaning_id: result.meaning_id,
          word_id: result.word_id,
          sentence: localStorage.sentence,
          book_name: window.bookKaMeta.bookTitle,
          author_name: window.bookKaMeta.creator,
*/
