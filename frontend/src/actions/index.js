let nextTodoId = 0;
export const Login = (role, name, email) => ({
  type: "LOGIN",
  role,
  name,
  email,
});

export const logout = () => ({
  type: "LOGOUT",
});
