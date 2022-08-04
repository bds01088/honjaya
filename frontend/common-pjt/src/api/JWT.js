export const saveToken = (token) => {
  window.localStorage.setItem('access-Token', token);
};
export const getToken = () => {
  return window.localStorage.getItem('access-Token');
};
export const deleteToken = () => {
  window.localStorage.removeItem('access-Token');
};
