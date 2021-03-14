export const setActiveBookFileName = (file_name) => ({
  type: 'ACTIVE_BOOK_FILE_NAME',
  file_name,
});

export const setActiveBookLocation = (current_book_location) => ({
  type: 'ACTIVE_BOOK_CURRENT_PAGE_LOCATION',
  current_book_location,
});

export const setSelectedWord = (selected_word) => ({
  type: 'ACTIVE_BOOK_SELECTED_WORD',
  selected_word,
});

export const setSelectedWordinSentence = (selected_word_in_sentence) => ({
  type: 'ACTIVE_BOOK_SELECTED_SENTENCE',
  selected_word_in_sentence,
});
export const setSelectedWordinParagraph = (selected_word_in_paragraph) => ({
  type: 'ACTIVE_BOOK_SELECTED_PARAGRAPH',
  selected_word_in_paragraph,
});

export const setWordMeanings = (meanings) => ({
  type: 'ACTIVE_BOOK_SELECTED_WORD_MEANINGS',
  meanings,
});
export const setWordImages = (images) => ({
  type: 'ACTIVE_BOOK_SELECTED_WORD_IMAGES',
  images,
});
export const setBookName = (book_name) => ({
  type: 'ACTIVE_BOOK_NAME',
  book_name,
});
export const setAuthorName = (author_name) => ({
  type: 'ACTIVE_BOOK_AUTHOR_NAME',
  author_name,
});
