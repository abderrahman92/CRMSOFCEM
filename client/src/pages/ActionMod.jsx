import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthAction from "../services/Action";
import "react-datepicker/dist/react-datepicker.css";
import checkForm from '../common/Ajouter/checkedForm'
import './../assets/css/picklist.css'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { useParams } from "react-router-dom";
const ActionMod = () => {



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

    const initialSocieteState = {
        id: "",
        date_action: "",
        description: "",
        nom_interlocuteur: "",
        type_action: "",
        nom_societe: "",
        date_rdv: "",
        createdAt: "",


    };
    //liste type action  
    const options = [
        { type_action: 'RDV', label: 'RDV' },
        { type_action: 'contact téléphonique', label: 'contact téléphonique' },
        { type_action: 'contact teams', label: 'contact teams' },
        { type_action: 'contact par courrier', label: 'contact par courrier' }
    ]


    const [Action, setAction] = useState({ initialSocieteState });
    const [ListeAction, setListeAction] = useState([]);
    const [ListeSociete, setListeSociete] = useState([]);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [myJSON, setactive] = useState([]);
    const [myJSON_Societe, setactiveSociete] = useState([]);
    const form = useRef();
    const checkBtn = useRef();

    //set pickliste type action
    const land = (e) => {
        setactive(Array.isArray(e) ? e.map(x => x.type_action) : [])
    }
    //set pickliste nom societe
    const land2 = (e) => {
        setactiveSociete(Array.isArray(e) ? e.map(x => x.nom_soc) : [])
    }





    const saveSociete = (e) => {
        const type_action = myJSON.join();
        const nom_societe = myJSON_Societe.join();
        console(Action.id)
        var data = {
            id: Action.id,
            date_action: Action.date_action,
            description: Action.description,
            nom_interlocuteur: Action.nom_interlocuteur,
            type_action: type_action,
            date_rdv: Action.date_rdv,
            nom_societe: nom_societe,
            message: message.message,
            successful: successful.successful,
        };

        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthAction.update(Action.id, data)
                .then(response => {
                    setAction({
                        id: response.data.id,
                        date_action: response.data.date_action,
                        description: response.data.description,
                        nom_interlocuteur: response.data.nom_interlocuteur,
                        type_action: response.data.type_action,
                        date_rdv: response.data.date_rdv,
                        nom_societe: response.data.nom_societe,
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

    console.log("test", myJSON)

    // API modifier
    const params = useParams();
    var nb = parseInt(params.id);
    const user = AuthService.getCurrentUser()
    //SELECT ALL SOCIETES WHERE AUTH
    const retrieveTutorials = () => {
        if (user) {
            //liste action
            AuthAction.findAll()
                .then((response) => {
                    setListeAction(response.data);

                })
                .catch((e) => {
                    console.log(e);
                });
            //liste societe
            //afficher cemca
            UserService.getCemecaBoard().then(
                response => {
                    axios.get("http://localhost:8080/cemeca").then((response) => {
                        setListeSociete(response.data);
                    })
                },



            );
            //afficher cemca
            UserService.getSofitechBoard().then(
                response => {
                    axios.get("http://localhost:8080/sofitech").then((response) => {
                        setListeSociete(response.data);
                    })
                },



            );

        }
    };
    //FILTER SOCIETES SELON L'ID 
    const actItem = ListeAction.filter(task => task.id === nb)
    useEffect(() => {
        retrieveTutorials()
    }, []);

    console.log(ListeSociete)



    const handleInputChange = event => {
        const { name, value } = event.target;
        setAction({ ...Action, [name]: value });

    };



    return (
        <div className="submit-form">



            <Form onSubmit={saveSociete} ref={form}>
                {!successful && (
                    <div>

                        <div className="form-group">

                            <label htmlFor="title">id</label>
                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.id}
                                    value={Action.id = e.id}
                                    onChange={handleInputChange}
                                    validations={[required, vsiret]}
                                    name="id"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">date RDV</label>
                            {actItem.map((e) =>

                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="title"
                                    defaultValue={(e.date_rdv).toString().substring(0, 16)}
                                    value={Action.date_rdv}
                                    onChange={handleInputChange}
                                    validations={[required, vsiren]}
                                    name="date_rdv"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">description</label>

                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.description}
                                    value={Action.description}
                                    onChange={handleInputChange}
                                    validations={[required, vnom_soc]}
                                    name="description"
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">nom interlocuteur</label>
                            {actItem.map((e) =>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    defaultValue={e.nom_interlocuteur}
                                    value={Action.nom_interlocuteur}
                                    onChange={handleInputChange}
                                    validations={[required, vnom_responsable]}
                                    name="nom_interlocuteur"
                                />
                            )}
                        </div>
                        <div className="form-group">

                            <label htmlFor="title">Type d activite commerciale</label>
                            <Multiselect
                                displayValue="type_action"
                                value="4"
                                isObject={true}
                                selectedValues={console.log}
                                onChange={console.log}
                                id={console.log}
                                onNOMPressFn={function noRefCheck() { }}
                                onRemove={function noRefCheck() { }}
                                onSearch={function noRefCheck() { }}
                                onSelect={land}
                                options={options}
                                showCheckbox
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="title">nom societe</label>
                            <Multiselect
                                displayValue="nom_soc"
                                value="4"
                                isObject={true}
                                selectedValues={console.log}
                                onChange={console.log}
                                id={console.log}
                                onNOMPressFn={function noRefCheck() { }}
                                onRemove={function noRefCheck() { }}
                                onSearch={function noRefCheck() { }}
                                onSelect={land2}
                                options={ListeSociete}
                                showCheckbox
                            />

                        </div>




                        <button className="btn btn-success">
                            Valider
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

    );
};

export default ActionMod;
