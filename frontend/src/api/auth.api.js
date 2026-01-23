import axios from "./axios";
import { API_ROUTES } from "../utils/constants";

const authAPI = {
  register(userData) {
    return axios
      .post(API_ROUTES.AUTH.REGISTER, userData)
      .then(res => res.data);
  },

  login(email, password) {
    return axios
      .post(API_ROUTES.AUTH.LOGIN, { email, password })
      .then(res => res.data);
  },

  logout() {
    return axios
      .post(API_ROUTES.AUTH.LOGOUT)
      .then(res => res.data);
  },

  getMe() {
    return axios
      .get(API_ROUTES.AUTH.ME)
      .then(res => res.data);
  },

  updateProfile(data) {
    return axios
      .put(API_ROUTES.AUTH.UPDATE_PROFILE, data)
      .then(res => res.data);
  },

  changePassword(currentPassword, newPassword) {
    return axios
      .put(API_ROUTES.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      })
      .then(res => res.data);
  },
};

export default authAPI;
