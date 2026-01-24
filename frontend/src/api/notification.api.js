import axios from "./axios.api.js";
import {API_ROUTE} from "../utils/constant.js";

const notificationAPI = {
    getAll :async (page=1, limit=20)=>{
        const {data} =await axios.get(
            API_ROUTE.NOTIFICATIONS.GET_MY,
            {
                params:{
                    page,
                    limit
                }
            }
        );
    return data;
    },

    markAsRead:async (notificationId)=>{
        const {data} =await axios.put(
            API_ROUTE.NOTIFICATIONS.MARK_AS_READ(notificationId)
        );
        return data;
    },
    markAllAsRead: async ()=>{
        const {data} =await axios.put(
        API_ROUTE.NOTIFICATIONS.MARK_ALL_AS_READ
        );
        return data;
    },
    
    delete: async (notificationId)=>{
        const {data} =await axios.delete(
        API_ROUTE.NOTIFICATIONS.DELETE(notificationId)
        );
        return data;
    },
};
export default notificationAPI;