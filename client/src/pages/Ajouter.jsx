
import React, { useState,useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthSociete from "../services/societe";
import "react-datepicker/dist/react-datepicker.css";
import checkForm from '../common/Ajouter/checkedForm'
import './../assets/css/picklist.css'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import liste from "../assets/JsonData/liste_syndicat.json"


const AddTutorial = () => {

  //variable checked from 
    const required = checkForm.required;
    const vsiret = checkForm.vsiret;
    const vsiren = checkForm.vsiren;
    const vnom_soc = checkForm.vnom_soc;
    const vnom_responsable = checkForm.vnom_responsable;
    const vdate_creation_soc = checkForm.vdate_creation_soc;
    const vid_role = checkForm.vid_role;
    const vcode_postal = checkForm.vcode_postal;
    const vobservation = checkForm.vopportunité;
    const cville = checkForm.cville;
    const vsyndicat = checkForm.vobservation;
    const vactivité = checkForm.vactivité;
    const vtel = checkForm.vtel;
    const vpays = checkForm.vpays;
    const vadresse = checkForm.vadresse;
  // intitial societe
    const initialSocieteState = {
      siret: "",
      siren: "",
      nom_soc: "",
      nom_responsable_soc: "",
      date_creation_soc: "",
      activite_soc: "",
      adresse_local: "",
      pays: "",
      ville_soc: "",
      code_postal: "",
      syndicat: "",
      observation: "",
      tel: "",
      app_sofitech: "",
      app_cemeca: "",
      soc_sofitech: "",
      soc_cemeca: "",
      id_role: "",
    
      
    };

  
  
  const [Societe, setSociete] = useState({initialSocieteState});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [myJSON, setactive] = useState([]);
  const form = useRef();
  const checkBtn = useRef();


  const land =(e) => {
    setactive(Array.isArray(e)?e.map(x=>x.NOM):[])
  }


 

  const saveSociete = (e) => {
        const syndicat = myJSON.join();
        var data = {
          siret: Societe.siret,
          siren: Societe.siren,
          nom_soc: Societe.nom_soc,
          nom_responsable_soc: Societe.nom_responsable_soc,
          date_creation_soc: Societe.date_creation_soc,
          activite_soc: Societe.activite_soc,
          adresse_local: Societe.adresse_local,
          pays: Societe.pays,
          ville_soc: Societe.ville_soc,
          code_postal:Societe.code_postal,
          syndicat:syndicat,
          observation: Societe.observation,
          tel: Societe.tel,   
          id_role: Societe.id_role,
          message: message.message,
          successful:successful.successful,
        };
      
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
          AuthSociete.create(data)
            .then(response => {
              setSociete({
                siren:response.data.siren,
                siret: response.data.siret,
                nom_soc: response.data.nom_soc,
                nom_responsable_soc: response.data.nom_responsable_soc,
                activite_soc: response.data.activite_soc,
                adresse_local: response.data.adresse_local,
                pays: response.data.pays,
                ville_soc: response.data.ville_soc,
                code_postal: response.data.code_postal,
                syndicat: response.data.syndicat,
                observation: response.data.observation,
                tel: response.data.tel,
                date: response.data.date,
                id_role: response.data.id_role
              }
              );
              setSuccessful(true);
              setMessage(response.data.message)
              console.log(Societe.syndicat,'syndicat');
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
  
  console.log("test",myJSON)
 


 //API INSEE
  const API_INSEE_SIRET = 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/?siret='
   var b = String(Societe.siret)
   console.log(b.length)
   const chaine = API_INSEE_SIRET +b
  const getAPINSEE =()=> {
  
    return axios.get(API_INSEE_SIRET+b);
  }
  console.log()
  const [SIRETAPI, setSIRETAPI] = useState([]);
  useEffect(() =>{
        //afficher API insee
        
       
},[]);


const handleInputChange = event => {
  const { name, value } = event.target;
  setSociete({ ...Societe, [name]: value });
  getAPINSEE().then((response) => {        
    setSIRETAPI(response.data.etablissements);
  })
};
console.log(SIRETAPI)



  return (
    <div className="submit-form">
       <div className="card card-container">
        <h3><i class='bx bxs-bank danger'></i> Ajouter une Société</h3>
          <Form onSubmit={saveSociete} ref={form}>
          {!successful && (
            <div>

                <div className="form-group">
                
                  <label htmlFor="title">siret</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.siret}
                    onChange={handleInputChange}
                    validations={[required,vsiret]}
                    name="siret"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">siren</label>
                  {SIRETAPI.map((e)=>
                  
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={ Societe.siren=e.siren}
                    onChange={handleInputChange}
                    validations={[required,vsiren]}
                    name="siren"
                  />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="title">nom de la societe</label>
                  {SIRETAPI.map((e)=>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.nom_soc=e.unite_legale.denomination}
                    onChange={handleInputChange}
                    validations={[required,vnom_soc]}
                    name="nom_soc"
                  />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="title">nom du delegué</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.nom_responsable_soc}
                    onChange={handleInputChange}
                    validations={[required, vnom_responsable]}
                    name="nom_responsable_soc"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">code naf</label>      
                    
                    {SIRETAPI.map((e)=>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.activite_soc = e.activite_principale}
                    onChange={handleInputChange}
                    validations={[required,vsyndicat]}
                    name="activite_soc"
                  />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="title">adresse_local</label>
                  {SIRETAPI.map((e)=>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.adresse_local=e.geo_l4}
                    onChange={handleInputChange}
                    validations={[required,vadresse]}
                    name="adresse_local"
                  />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="title">pays</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    defaultValue="France"
                    value={Societe.pays}
                    onChange={handleInputChange}
                    validations={[required,vpays]}
                    name="pays"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">ville_soc</label>
                  {SIRETAPI.map((e)=>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.ville_soc=e.libelle_commune}
                    onChange={handleInputChange}
                    validations={[required,cville]}
                    name="ville_soc"
                  />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="text">code_postale</label>
                  {SIRETAPI.map((e)=>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.code_postal=e.code_postal}
                    onChange={handleInputChange}
                    validations={[required,vcode_postal]}
                    name="code_postal"
                  />
                  )}
                </div>
              
                <div className="form-group">
                  
                  <label htmlFor="title">syndicat</label>
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
                  <label htmlFor="title">observation</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    defaultValue="Thierry"
                    value={Societe.observation}
                    onChange={handleInputChange}
                    validations={[required,vobservation]}
                    name="observation"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">telephone Societes</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="title"
                    value={Societe.tel}
                    onChange={handleInputChange}
                    validations={[required,vtel]}
                    name="tel"
                  />
                </div>
              
                
                <select  validations={[required,vid_role]}  value={Societe.id_role} onChange={handleInputChange} name="id_role" >
                  <option>select une valeur</option>
                  <option value="1">cemeca</option>
                  <option value="2">sofitech</option>
                </select>
              
                <button  className="btn btn-success">
                  Submit
                </button>
              

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
};

export default AddTutorial;
