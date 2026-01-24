import axios from "./axios.api";
import {API_ROUTE} from "../utils/constant";

const usersAPI ={
  getProfile: async (userName)=>{
    const {data} =await axios.get(
      API_ROUTE.USER.PROFILE(userName)
    );
    return data;
  },

  search: async (query, limit = 10)=>{
    const {data} =await axios.get(
      API_ROUTE.USER.SEARCH,
      {params: {q: query, limit}}
    );
    return data;
  },

  uploadAvatar: async (file)=>{
    const formData =new FormData();
    formData.append("avatar", file);

    const {data} =await axios.put(
      API_ROUTE.USER.UPLOAD_AVATAR,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
};

export default usersAPI;
