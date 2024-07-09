const reducer = (state = { role: "guest", name: "", email: "" }, action) => {
  //es6 arrow function
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        role: action.role,
        name: action.name,
        email: action.email,
      };
    case "LOGOUT":
      return {
        ...state,
        role: "guest",
        name: "",
        email: "",
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
