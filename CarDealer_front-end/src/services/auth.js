import axios from "./axios";

export const login = (credentials) => axios.post("/users/login", credentials);
export const register = (userData) => axios.post("/users/register", userData);
export const showUsers = () => axios.get("/users");
export const logout = () => axios.post("/users/logout");
export const modifyUser = (user) => axios.post(`/users/update`, user);
export const deleteUser = (userData) => axios.post(`/users/delete`,userData);
export const passwordReset = (userData) => axios.post("/users/reset-password", userData);

export default {
    login,
    register,
    showUsers,
    logout,
    modifyUser,
    deleteUser,
    passwordReset
}
