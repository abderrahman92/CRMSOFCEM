import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";



class AuthRole {

 

  findAll(){
    return axios.get(API_URL + "role");

  };
 

 
}

export default new AuthRole();
