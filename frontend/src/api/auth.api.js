import axios from "./axios";
import { API_ROUTE } from "../utils/constants";

const authAPI = {
  register(userData) {
    return axios
      .post(API_ROUTE.AUTH.REGISTER, userData)
      .then(res => res.data);
  },

  login(email, password) {
    return axios
      .post(API_ROUTE.AUTH.LOGIN, { email, password })
      .then(res => res.data);
  },

  logout() {
    return axios
      .post(API_ROUTE.AUTH.LOGOUT)
      .then(res => res.data);
  },

  getMe() {
    return axios
      .get(API_ROUTE.AUTH.ME)
      .then(res => res.data);
  },

  updateProfile(data) {
    return axios
      .put(API_ROUTE.AUTH.UPDATE_PROFILE, data)
      .then(res => res.data);
  },

  changePassword(currentPassword, newPassword) {
    return axios
      .put(API_ROUTE.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      })
      .then(res => res.data);
  },
};

export default authAPI;
