import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';

import {EPUB_IMPORT_LOCAL_DIR_NAME} from '../../constants';
import {addBook} from './bookActions';
import {logger} from '../../utils/logger';

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
