export const setUserID = (userId) => ({
  type: 'USER_SET_USER_ID',
  userId,
});
export const setStudentId = (student_id) => ({
  type: 'USER_SET_STUDENT_ID',
  student_id,
});
export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'USER_SET_IS_LOGGED_IN',
  isLoggedIn,
});
export const setIsTeacher = (isTeacher) => ({
  type: 'USER_SET_ISTEACHER',
  isTeacher,
});
export const setEmail = (email) => ({
  type: 'USER_SET_EMAIL',
  email,
});
export const setBookURL=book_url =>({
    type: 'USER_BOOK_URL',
    book_url,
});
export const setCurrentBookLocation=current_book_location =>({
    type: 'USER_CURRENT_BOOK_LOCATION',
    current_book_location,
});

//setUser('Hello')-->{type: 'USER_SET_USER', user:hello}
