import React, { useState, useRef ,useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthAction from "../services/Interlocuteur";
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import axios from 'axios';
//table class

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Action = (props) => {

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();
    const [ID_societe,setID_societe] = useState([]);
    useEffect(()=>{
      retrieveTutorials();
      const user = AuthService.getCurrentUser();
          if (user){
                 //afficher cemca
          UserService.getCemecaBoard().then(
              response => {
                  axios.get("http://localhost:8080/cemeca").then((response)=>{
                    setID_societe(response.data);
                  })
              },
            );
             //afficher cemca
          UserService.getSofitechBoard().then(
              response => {
                  axios.get("http://localhost:8080/sofitech").then((response)=>{
                    setID_societe(response.data);
                  })
              },
  
            );
            
          }
   },[]) 
// Get ID from URL
const params = useParams();
var nb=parseInt(params.id);
const actItem =ID_societe.filter(task=>task.siret===nb)
console.log(actItem)
//inntial user state
const user = AuthService.getCurrentUser()
//intitial Action 
    const initialState = {
    nom:"",
    prenom: "",
    email:"",
    adresse: "",
    code_postale: "",
    tel: "",
    activite: "", 
    id_soc: "",
    };

  const [Interlocuteur, setInterlocuteur] = useState({initialState});
  const [listeinter ,Setlisteinter] = useState([]);

  const retrieveTutorials = () => {
    AuthAction.findAll()
      .then((response) => {
        Setlisteinter(response.data);
       
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const filterInter =listeinter.filter(task=>task.id_soc===nb)
  console.log(filterInter)

  
  const saveAction = (e) => {
  
    var data = {
      nom:Interlocuteur.nom,
      prenom:Interlocuteur.prenom,
      email:Interlocuteur.email,
      adresse: Interlocuteur.adresse,
      code_postale:Interlocuteur.code_postale,
      tel:Interlocuteur.tel,
      fonction_inter:Interlocuteur.fonction_inter,
      id_soc:nb,
    };
  
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthAction.create(data)
        .then(response => {
        setInterlocuteur({
           nom:response.data.nom,
           prenom: response.data.prenom,
           email: response.data.email,
           adresse: response.data.adresse,
           code_postale: response.data.code_postale,
           tel: response.data.tel,
           fonction_inter: response.data.fonction_inter,
           id_soc: response.data.id_soc,
          }
          );
          setSuccessful(true);
          setMessage(response.data.message)
        },
        error => {
          const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
        }
        )
        .catch(e => {
          console.log(e);

        });
    }
};
const handleInputChange = event => {
  const { name, value } = event.target;
  setInterlocuteur({ ...Interlocuteur, [name]: value });

};

    return (
        <div className="col-md-12">
  
         
          <div className="card card-container">
          <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>nom</TableCell>
                                            <TableCell align="left">prenom</TableCell>
                                            <TableCell align="left">fonction</TableCell>
                                            <TableCell align="left">adresse postal</TableCell>
                                            <TableCell align="left">telephone</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {filterInter.map((row) => (
                                              <TableRow key={row.nom}>
                                                <TableCell>{row.nom}</TableCell> 
                                                <TableCell>{row.prenom}</TableCell> 
                                                <TableCell>{row.fonction_inter}</TableCell> 
                                                <TableCell>{row.adresse}{row.code_postal}</TableCell>        
                                                <TableCell>{row.tel}</TableCell>    
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                    </Table>
            </TableContainer>
          </div>
    
   {/* ajouter un user */}
   <div className="card card-container">
          <h1> Ajouter un interlocuteur</h1>
           
            <Form onSubmit={saveAction} ref={form}>
                {!successful && (
                    <div>
                       <div className="form-group">
                        <label htmlFor="username">nom</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="nom"
                          value={Interlocuteur.nom}
                          onChange={handleInputChange}
                          
                        />
                      </div>
    
                      <div className="form-group">
                        <label htmlFor="username">prenom</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="prenom"
                          value={Interlocuteur.prenom}
                          onChange={handleInputChange}
                          
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">email</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={Interlocuteur.email}
                          onChange={handleInputChange}
                          
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">adresse</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="adresse"
                          value={Interlocuteur.adresse}
                          onChange={handleInputChange}
                          
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">code postal</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="code_postale"
                          value={Interlocuteur.code_postale}
                          onChange={handleInputChange}
                          
                        />
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="email">tel</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="tel"
                          value={Interlocuteur.tel}
                          onChange={handleInputChange}
                          
                        />
                      </div>        
                      <div className="form-group">
                        <label htmlFor="email">fonction</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="fonction_inter"
                          value={Interlocuteur.fonction_inter}
                          onChange={handleInputChange}
                          
                        />
                      </div>    
                     
                     

                    

                      <div className="form-group">
                        <button className="btn btn-primary btn-block">Valider l'action</button>
                      </div>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
          </div> 
          </div>
      );
    }
    export default Action;
  
  