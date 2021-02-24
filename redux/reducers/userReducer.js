const INITIAL_STATE = {
  // user:'',
  student_id: '',
  isLoggedIn: false,
  // loadingState:'init',
  email: '',
  userId: '',
  isTeacher: '',
  student_id: '',
  book_url: '',
  current_book_location: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_SET_USER_ID':
      return {
        ...state,
        userId: action.userId,
      };
    case 'USER_SET_EMAIL':
      return {
        ...state,
        email: action.email,
      };
    case 'USER_SET_STUDENT_ID':
      return {
        ...state,
        student_id: action.student_id,
      };
    case 'USER_SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case 'USER_SET_ISTEACHER':
      return {
        ...state,
        isTeacher: action.isTeacher,
      };
    case 'USER_BOOK_URL':
      return {
        ...state,
        book_url: action.book_url,
      };
    case 'USER_CURRENT_BOOK_LOCATION':
      return {
        ...state,
        current_book_location: action.current_book_location,
      };
    default:
      return state;
  }
};
export default userReducer;
