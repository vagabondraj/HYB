import axios from "./axios.api.js";
import { API_ROUTE } from "../utils/constant.js";

const authAPI = {
  register: async(userData)=>{
    return axios
      .post(API_ROUTE.AUTH.REGISTER, userData)
      .then(res => res.data);
  },

  login:async(email, password)=>{
    return axios
      .post(API_ROUTE.AUTH.LOGIN, { email, password })
      .then(res => res.data);
  },

  logout: async()=>{
    return axios
      .post(API_ROUTE.AUTH.LOGOUT)
      .then(res => res.data);
  },

  getMe: async()=>{
    return axios
      .get(API_ROUTE.AUTH.ME)
      .then(res => res.data);
  },

  updateProfile: async(data)=>{
    return axios
      .put(API_ROUTE.AUTH.UPDATE_PROFILE, data)
      .then(res => res.data);
  },

  changePassword: async(currentPassword, newPassword)=>{
    return axios
      .put(API_ROUTE.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      })
      .then(res => res.data);
  },
};

export default authAPI;
