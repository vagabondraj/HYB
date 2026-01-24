import axios from "./axios.api.js";
import {API_ROUTE} from "../utils/constant.js";

const requestAPI = {
    getAll: async(filters={})=>{
        return axios
          .get(API_ROUTE.REQUESTS.GET_ALL,{params : filters})
          .then(res=>res.data);
    },

    getById : async(id)=>{
        return axios
          .get(API_ROUTE.REQUESTS.GET_BY_ID(id))
          .then(res=>res.data);
    },

    getMyRequests : async()=>{
        return axios
           .get(API_ROUTE.REQUESTS.GET_MY)
           .then(res=>res.data);
    },
    
    create: async(data)=>{
        const formData= new FormData();
        Object.entries(data).forEach(([key,value])=>{
            if(value!= null && value !== undefined){
                formData.append(key, value);
            }
        });
        return axios
           .post(API_ROUTE.REQUESTS.CREATE, formData,{
            headers: { "Content-Type": "multipart/form-data" },
           })
           .then(res=>res.data);
    },

    update: async(id, data)=>{
    return axios
      .put(API_ROUTE.REQUESTS.UPDATE(id), data)
      .then(res => res.data);
  },

    accept: async(id) =>{
        return axios
        .put(API_ROUTE.REQUESTS.ACCEPT(id))
        .then(res => res.data);
    },

    cancel: async(id)=>{
        return axios
        .put(API_ROUTE.REQUESTS.CANCEL(id))
        .then(res => res.data);
    },

    fulfill:async(id)=>{
        return axios
        .put(API_ROUTE.REQUESTS.FULFILL(id))
        .then(res => res.data);
    },

    delete: async(id)=>{
        return axios
        .delete(API_ROUTE.REQUESTS.DELETE(id))
        .then(res => res.data);
    },
};
export default requestAPI;