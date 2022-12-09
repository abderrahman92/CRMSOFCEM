import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Form from "react-validation/build/form";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CheckButton from "react-validation/build/button";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import AuthAction from '../services/Action';
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';

const initialSocieteState = {
  id: "",
  validation: "",
};

function ActionDetails() {

  // Get ID from URL
  const params = useParams();
  var nb = parseInt(params.id);

  //GET USER INFO
  const user = AuthService.getCurrentUser()
  //GET Action 
  const [Vali, setVali] = useState({ initialSocieteState });
  const [Action, SetAction] = useState([]);
  const [Etat, setEtat] = useState([]);
  const [Test, setTest] = useState([]);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  //SELECT ALL SOCIETES WHERE AUTH
  const retrieveActions = (e) => {
    if (user) {
      AuthAction.findAll().then(
        response => {
          axios.get("http://localhost:8080/api/auth/action").then((response) => {
            SetAction(response.data);

          })
        })





    }
  };
  const valideAction = (e) => {
    var data = {
      id: Test,
      validation: Etat,
    };

    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthAction.update(Test, data)
        .then(response => {
          setVali({
            id: response.data.id,
            validation: response.data.validation

          }
          );
          setSuccessful(true);
          setMessage('Activité commerciale Réaliser')
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

  }


  const activSoc = Action.filter(task => task.id === nb)
  activSoc.sort((a, b) => new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());

  useEffect(() => {
    retrieveActions()
  }, []);


  //CARD TABLE 
  const card = (
    <React.Fragment>
      {Etat =="realiser" ? (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-success"
                : ""
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      ) : (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-danger"
                : ""
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    

      {Action.map((e) =>
      

      
        <Card variant="outlined" >
          <CardContent>
            <Typography variant="h5" component="div">
              <i class='bx bxs-id-card'></i>: {e.id}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Date activité commerciale : {moment(e.date_rdv).format("DD  MMMM YYYY  HH:mm")}
            </Typography>
            <Typography variant="body2">
              Déscription : {e.description}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              date de creation : {moment(e.createdAt).format("DD  MMMM YYYY  HH:mm")}
            </Typography>




          </CardContent>
          <div className="col-6">
            <Form onSubmit={valideAction} ref={form}>
              {!successful && (

                <button className="btn btn-success"
                  onClick={() => (setTest(e.id), setMessage('Activité commerciale Réaliser'), setEtat('realiser'))}
                  value={Vali.id = e.id}
                  name="id"
                >
                  Réaliser
                </button>

              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>
            <div className="col-6">

        
            <Form onSubmit={valideAction} ref={form}>
              {!successful && (

                <button className="btn btn-success"
                  onClick={() => (setTest(e.id), setMessage('Activité  commerciale Réaliser Annulé'), setEtat('non realiser'))}
                  value={Vali.id = e.id}
                  name="id"
                >
                  Nom Réaliser
                </button>

              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>
            

          

         


          <CardActions>
            <Button href={`/Actions/modifier/${e.id}`} size="small">Modifier</Button>
          </CardActions>
        </Card>
      )}
      <CardActions>
        <Button href={`/`} size="small">Retour</Button>
      </CardActions>

    </React.Fragment>
    
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <div className="row">
      <div variant="outlined">{card}</div>
      </div>
    </Box>
  );

}

export default ActionDetails
