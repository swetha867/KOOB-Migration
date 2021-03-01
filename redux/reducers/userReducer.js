const INITIAL_STATE = {
  // user:'',
  student_id: '',
  isLoggedIn: false,
  // loadingState:'init',
  email: '',
  userId: '',
  isTeacher: '',
  student_id: '',
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
    default:
      return state;
  }
};
export default userReducer;
