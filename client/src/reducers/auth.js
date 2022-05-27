const authReducer = (state = { authData: null }, action) => {
  console.log(action.type)
  switch (action.type) {
    case "AUTH":
      console.log("here")
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case "LOGOUT":
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;