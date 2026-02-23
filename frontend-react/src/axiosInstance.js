import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})

//request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
        config.headers["Authorization"] =  `Bearer ${accessToken}`
    }
    
    return config;
    },
    function (error){
        return Promise.reject(error)
    }
)

//response Interceptors:
axiosInstance.interceptors.response.use( function(response){
    return response
},
    //Handle Failed Response
   async function(error) {
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem("refresh")
            try{
                const response = await axiosInstance.post("/token/refresh/", {refresh : refreshToken})
                localStorage.setItem("accessToken",response.data.access)
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refresh")
            }
        }
        return Promise.reject(error)
    })

export default axiosInstance;