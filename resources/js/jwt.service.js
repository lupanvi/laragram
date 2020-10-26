export const getToken = () => {  
    return window.localStorage.getItem('user_token');
};

export const saveToken = token => {
	window.localStorage.setItem("user_token", token);
};

export const destroyToken = () => {
  window.localStorage.removeItem("user_token");
};

export default { getToken, saveToken, destroyToken };