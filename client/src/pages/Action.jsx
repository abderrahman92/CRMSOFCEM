import React, { useState, useRef ,useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthAction from "../services/Action";
import AuthInter from "../services/Interlocuteur";
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Multiselect from 'multiselect-react-dropdown';
import sidebar_items from '../assets/JsonData/sidebar_routes.json'
//table class
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select  from '@mui/material/Select';
// json data centre  d'affaire
import  liste  from "../assets/JsonData/centre-affaire.json";



  const Action = (props) => {
      const [myJSON, setactive] = useState([]);
      const [successful, setSuccessful] = useState(false);
      const [message, setMessage] = useState("");
      const form = useRef();
      const checkBtn = useRef();
      const [ID_societe,setID_societe] = useState([]);
      const [ListeAction,SetAction] = useState([]);
      const [new_sidbar,setSidbar]=useState(sidebar_items)
      const [interlocuteur,setInterlocuteur]=useState([])
    
      useEffect(()=>{
        const user = AuthService.getCurrentUser();
            if (user){
                //INTERLOCUTEUR
                AuthInter.findAll().then((response)=>{
                  setInterlocuteur(response.data)
                })
                //ACTION 
                AuthAction.findAll().then((response) => {
                  SetAction(response.data)
                  console.log(response.data)
                })
                .catch((e) => {
                    console.log(e);
                });
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
      
    //aficher sidbar action
      const action = '/Action/'+params
        console.log(action);

      if(props.location.pathname == action){
        const nouveaustate = [...new_sidbar]
        nouveaustate[5].status = "active"
      }

    //recuperer les action du user
        const user = AuthService.getCurrentUser()
        const listeActUser =ListeAction.filter(task=>task.id_utili===user.id)

        const land =(e) => {
          setactive(Array.isArray(e)?e.map(x=>x.NOM):[])
        }
        //filter action where siret
        const actItem =ID_societe.filter(task=>task.siret===nb)
        //filter interlocuteur where siret
        const filterInter =interlocuteur.filter(task=>task.id_soc===nb)
        console.log(filterInter)
        


          //intitial Action 
              const initial1ctionState = {
              id_utili:"",
              nom_interlocuteur: "",
              type_action:"",
              nom_societe: "",
              description: "",
              date_action: "",
              date_rdv: "", 
              };

          //ajouter l'action      
            const [Action, setAction] = useState({initial1ctionState});
            const saveAction = (e) => {
              var data = {
                  nom_interlocuteur:Action.nom_interlocuteur,
                  nom_societe:actItem[0].nom_soc,
                  date_rdv:Action.date_rdv,
                  date_action: new Date(),
                  id_utili:user.id,
                  type_action:Action.type_action,
                  description:Action.description,


                
                };
              e.preventDefault();
              form.current.validateAll();
                if (checkBtn.current.context._errors.length === 0) {
                  AuthAction.create(data)
                    .then(response => {
                      setAction({
                      nom_interlocuteur:response.data.nom_interlocuteur,
                      nom_societe: response.data.nom_societe,
                      date_rdv: response.data.date_rdv,
                      date_action: response.data.date_action,
                      id_utili: response.data.id_utili,
                      type_action: response.data.type_action,
                      description: response.data.description,
                      
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
              setAction({ ...Action, [name]: value });

            };
          //liste type action  
            const options = [
              { value: 'RDV', label: 'RDV' },
              { value: 'contact téléphonique', label: 'contact téléphonique' },
              { value: 'contact teams', label: 'contact teams' },
              { value: 'contact par courrier', label: 'contact par courrier' }
            ]

      return (
       <div className="col-md-12">
          {/* ajouter une action */}
            <h3><i class='bx bxs-bank danger'></i> liste des actions</h3>
            {/* liste des actions */}
                    <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>nom societe</TableCell>
                                                    <TableCell align="right">date rdv</TableCell>
                                                    <TableCell align="right">nom_interlocuteur</TableCell>
                                                    <TableCell align="right">date_action</TableCell>
                                                    <TableCell align="right">type</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {listeActUser.map((row) => (
                                                    <TableRow
                                                    key={row.nom}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row">
                                                        {row.nom_societe}
                                                    </TableCell>
                                                    
                                                    <TableCell align="right">{row.date_rdv}</TableCell>
                                                    <TableCell align="right">{row.nom_interlocuteur}</TableCell>
                                                    <TableCell align="right">{row.date_action}</TableCell>
                                                    <TableCell align="right">{row.type_action}</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                    </TableContainer>
                      <br />
            {/* ajouter des actions */}
            <h3><i class='bx bxs-bank danger'></i> Ajouter une action</h3>
                <div className="card card-container">
                    {actItem.map((e)=>(
                      <h3><i class='bx bxs-bank danger'></i> {e.nom_soc}</h3>
                    ))}
                    <Form onSubmit={saveAction} ref={form}>
                        {!successful && (
                            <div>

                              <div className="form-group">
                                <label htmlFor="username">utlisateur</label>
                                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="utlisateur"
                                    multiline
                                    name="id_utili"
                                    value={user.username}
                                    onChange={handleInputChange}
                                  />
                                </FormControl>
                              </div>

                              <div className="form-group">
                                <label htmlFor="username">Date de l'action</label>
                                <Input
                                  type="date"
                                  className="form-control"
                                  name="date_rdv"
                                  value={Action.date_rdv}
                                  onChange={handleInputChange}
                                  
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="username">description</label>
                                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                    <TextField
                                      id="outlined-multiline-static"
                                      label="description"
                                      multiline
                                      rows={7}
                                      name="description"
                                      value={Action.description}
                                      onChange={handleInputChange}
                                    />
                                  </FormControl>
                              </div>

                              <div className="form-group">
                                <label htmlFor="email">nom de l'interlocuteur</label>
                                <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">nom de l'interlocuteur</InputLabel>
                                <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={Action.nom_interlocuteur}
                                          label="nom_interlocuteur"
                                          name="nom_interlocuteur"
                                          onChange={handleInputChange}
                                        >
                                            {filterInter.map((e)=>(
                                          <MenuItem value={e.nom}>{e.nom} {e.prenom}</MenuItem>
                                            ))}
                                        </Select>
                                </FormControl>
                              </div>    

                              <div className="form-group">
                                <label htmlFor="password">type d'action</label>

                                      <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">type_action</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={Action.type_action}
                                          label="type_action"
                                          name="type_action"
                                          onChange={handleInputChange}
                                        >
                                          <MenuItem value={"RDV"}>RDV</MenuItem>
                                          <MenuItem value={"contact téléphonique"}>contact téléphonique</MenuItem>
                                          <MenuItem value={"contact teams"}>contact teams</MenuItem>
                                          <MenuItem value={"contact par courrier"}>contact par courrier</MenuItem>
                                        </Select>
                                      </FormControl>
                      
                              </div>

                              <div className="form-group">
                        
                                  <label htmlFor="title">Centre d'affaires CREDIT COOPERATIF</label>
                                  <Multiselect
                                      displayValue="NOM"
                                      groupBy="TYPE"
                                      value="4"
                                      isObject={true}
                                      selectedValues={console.log}
                                      onChange={console.log}
                                      id={console.log}
                                      onNOMPressFn={function noRefCheck(){}}
                                      onRemove={function noRefCheck(){}}
                                      onSearch={function noRefCheck(){}}
                                      onSelect={land}
                                      options={liste}
                                      showCheckbox
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
  
  