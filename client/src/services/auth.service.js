import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  create_historique_auth(username,password,message){
    return axios.post(API_URL + "historique", {
      username,
      password,
      message
      
    });

  }
    get_historique_auth(){
    return axios.get(API_URL + "list_historique");

  };
  removeAll_historique_auth () {
    return axios.delete(API_URL +`list_historique`);
  };
  remove_historiqueremove(id) {
    return axios.delete(API_URL +`list_historique/${id}`);
  };

  register(username, email,roles, password,) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      roles,
      password,
      
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
