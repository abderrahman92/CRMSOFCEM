
import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthSociete from "../services/societe";
import "react-datepicker/dist/react-datepicker.css";
import checkForm from '../common/Ajouter/checkedForm'
import Typography from '@mui/material/Typography';
import Loader_cherche from "../components/search";
import './../assets/css/picklist.css'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import liste from "../assets/JsonData/liste_syndicat.json"
import origine_prospect from "../assets/JsonData/origine_prospect.json"
import Button from '@mui/material/Button';
import dotenv from 'dotenv'

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



  const [Societe, setSociete] = useState({ initialSocieteState });
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [myJSON, setactive] = useState([]);
  const form = useRef();
  const checkBtn = useRef();


  const land = (e) => {
    setactive(Array.isArray(e) ? e.map(x => x.NOM) : [])
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
      code_postal: Societe.code_postal,
      syndicat: syndicat,
      observation: Societe.observation,
      tel: Societe.tel,
      id_role: Societe.id_role,
      message: message.message,
      successful: successful.successful,
    };

    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthSociete.create(data)
        .then(response => {
          setSociete({
            siren: response.data.siren,
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
          console.log(Societe.syndicat, 'syndicat');
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





  //API INSEE
  const API_INSEE_SIRET = 'https://api.pappers.fr/v2/entreprise/?siret='
  var b = String(Societe.siret)
  console.log(b)
  const chaine = API_INSEE_SIRET + b
  console.log(chaine)
  const getAPINSEE = () => {

    return axios.get(chaine, {
      headers: { "Authorization": ` Bearer c0365fb0e540b3f284db6030a8d5c74282fe2c68985b1b52` }

    });
  }

  const [SIRETAPI, setSIRETAPI] = useState([]);
  const [Etablissement, SetETA] = useState([]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setSociete({ ...Societe, [name]: value });
    getAPINSEE().then((response) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false);
        setSIRETAPI(response.data);
        SetETA(response.data.etablissement);
      }, 3000)



    })
  };
  const result = Object.entries(SIRETAPI)
  const result2 = Object.entries(Etablissement)
  console.log(result)
  const Siren = result.filter(([key, value]) => key === 'siren');
  const Nom = result.filter(([key, value]) => key === "nom_entreprise");
  const Code_naf = result.filter(([key, value]) => key === "code_naf");
  const adresse = result2.filter(([key, value]) => key === "adresse_ligne_1");
  const paye = result2.filter(([key, value]) => key === "pays");
  const ville = result2.filter(([key, value]) => key === "ville");
  const code_postal = result2.filter(([key, value]) => key === "code_postal");


  const SIREN = () => {

    return (<div>
      {Siren.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.siren = e[1]}
          onChange={handleInputChange}
          validations={[required, vsiren]}
          name="siren"
        />
      )}
    </div>)

  }

  const NOM = () => {

    return (<div>
      {Nom.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.nom_soc = e[1]}
          onChange={handleInputChange}
          validations={[required, vnom_soc]}
          name="nom_soc"
        />
      )}
    </div>)

  }
  const CODENAF = () => {

    return (<div>
      {Code_naf.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.activite_soc = e[1]}
          onChange={handleInputChange}
          validations={[required, vsyndicat]}
          name="activite_soc"
        />
      )}
    </div>)

  }
  const ADRESSE = () => {

    return (<div>
      {adresse.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.adresse_local = e[1]}
          onChange={handleInputChange}
          validations={[required, vadresse]}
          name="adresse_local"
        />
      )}
    </div>)

  }
  const PAYE = () => {

    return (<div>
      {paye.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.pays = e[1]}
          onChange={handleInputChange}
          validations={[required, vpays]}
          name="pays"
        />
      )}
    </div>)

  }
  const VILLE = () => {

    return (<div>
      {ville.map((e, valeur) =>
        <Input
          key={valeur}
          type="text"
          className="form-control"
          id="title"
          value={Societe.ville_soc = e[1]}
          onChange={handleInputChange}
          validations={[required, cville]}
          name="ville_soc"
        />
      )}
    </div>)

  }
  const CODE = () => {

    return (
      <div>

        {code_postal.map((e, valeur) =>
          <Input
            key={valeur}
            type="text"
            className="form-control"
            id="title"
            value={Societe.code_postal = e[1]}
            onChange={handleInputChange}
            validations={[required, vcode_postal]}
            name="code_postal"
          />
        )}
      </div>)

  }





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
                  onChange={handleInputChange}
                  value={Societe.siret}
                  validations={[required, vsiret]}
                  name="siret"
                />
                <Button onClick={handleInputChange} variant="contained">valider</Button>
              </div>
             
            </div>
          )}
           {loading ?
                (
                  <div>
                    <Typography component="h1" variant="h5">

                      <Loader_cherche />
                    </Typography>
                  </div>
                )
                : (
                  <div></div>
                  )}       

          {result.length > 0 && (
            
            <div>
              
                  <div>

                    <div className="form-group">
                      <label htmlFor="title">siren</label>

                      <SIREN />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">nom de la societe</label>
                      <NOM />
                    </div>

                    <div className="form-group">
                      <label htmlFor="title">code naf</label>
                      <CODENAF />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">Adresse local</label>
                      <ADRESSE />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">pays</label>
                      <PAYE />
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">Ville</label>
                      <VILLE />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Code postale</label>
                      <CODE />
                    </div>
                    <div className="form-group">

                      <label htmlFor="title">origine du prospect </label>
                      <Multiselect
                        displayValue="NOM"
                        groupBy="TYPE"
                        value="4"
                        isObject={true}
                        selectedValues={console.log}
                        onChange={console.log}
                        id={console.log}
                        onNOMPressFn={function noRefCheck() { }}
                        onRemove={function noRefCheck() { }}
                        onSearch={function noRefCheck() { }}
                        onSelect={land}
                        options={origine_prospect}
                        showCheckbox
                      />

                    </div>
                  </div>
              

     

              <button className="btn btn-success">
                AJOUTER
              </button>


            </div>
          )}
                   <div className="form-group">

<label htmlFor="title">Syndicat</label>
<Multiselect
  displayValue="NOM"
  groupBy="TYPE"
  value="4"
  isObject={true}
  selectedValues={console.log}
  onChange={console.log}
  id={console.log}
  onNOMPressFn={function noRefCheck() { }}
  onRemove={function noRefCheck() { }}
  onSearch={function noRefCheck() { }}
  onSelect={land}
  options={liste}
  showCheckbox
/>

</div>

<div className="form-group">
<label htmlFor="title">Observation</label>
<Input
  type="text"
  className="form-control"
  id="title"
  defaultValue="Thierry"
  value={Societe.observation}
  onChange={handleInputChange}
  validations={[required, vobservation]}
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
  validations={[required, vtel]}
  name="tel"
/>
</div>


<select validations={[required, vid_role]} value={Societe.id_role} onChange={handleInputChange} name="id_role" >
<option>select une valeur</option>
<option value="1">cemeca</option>
<option value="2">sofitech</option>
</select>

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
