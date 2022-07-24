import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/";



class AuthInterlocuteur {

//creation de l'interlocuteur
  create(data){
    return axios.post(API_URL + "interlocuteur", data);
  }
 
//afficher les interlocuteurs
  findAll(){
    return axios.get(API_URL + "interlocuteur");

  };

//modifier les interlocuteurs
  
 
}

export default new AuthInterlocuteur();
