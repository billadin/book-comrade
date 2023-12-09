import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import auth from "../../firebase.config";
import { signOut } from "firebase/auth";


// https://book-comrade-4x8p8lq49-mir-billadins-projects.vercel.app
// https://book-comrade.vercel.app/
const instance = axios.create({
    baseURL: 'https://book-comrade.vercel.app/api/v1',
    withCredentials: true,
  });


  const useAxios = () => {
    // const { logOut } = useContext(AuthContext);
  
    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log('From Interceptor', error.response);

          signOut(auth)
          .then(res => console.log(res))
          .error(e=> console.log(e))
        }
      }
      );
      return instance;
    }
  

export default useAxios;