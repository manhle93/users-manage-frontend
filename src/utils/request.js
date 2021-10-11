import axios from "axios";
// import store from '@/store'
// import {getToken, setToken, removeToken} from "@/utils/auth";
import {getToken, removeToken} from "@/utils/auth";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vue from "vue";
Vue.use(Toast);

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000,
});

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Trước request
service.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + getToken();
    config.mode = "no-cors";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Sau request response
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  async error => {
    // if (error && error.response && error.response.data && error.response.data.code == "token_expire") {
    //   let result = await service.post("/auth/refresh");    //Refresh token khi hết hạn
    //   setToken(result.access_token);
    //   error.response.headers["Authorization"] = "Bearer " + getToken();
    //   return service.request(error.response.config);
    // }

    // else 
    if(error && error.response && error.response.data && error.response.data.code == "token_not_found" || error.response.data.code == 'unauthorized')
      {
          removeToken()
          location.assign("/login");
      }


    else {
        Vue.$toast.error(error.response.data.message, {
            position: "top-center",
            timeout: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
          });
         Promise.reject(error);
    }
   return Promise.reject(error);
  }
);

export default service;
