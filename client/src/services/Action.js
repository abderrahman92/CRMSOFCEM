import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";




class AuthAction {

//creation de l'action 
  create(data){
    return axios.post(API_URL + "action", data);
  }
//afficher tous les  l'actions
  findAll(){
    return axios.get(API_URL + "action");

  };
//modifier l'action 

}

export default new AuthAction();
