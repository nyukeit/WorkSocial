const initialState = {
  isLoggedIn: false,
  userToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
