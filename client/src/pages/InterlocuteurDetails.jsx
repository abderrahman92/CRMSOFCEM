import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import AuthInterlocuteur from "../services/Interlocuteur";
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';


function InterlocuteurDetails () {

  // Get ID from URL
  const params = useParams(); 
  var nb=parseInt(params.id);

  //GET USER INFO
  const user = AuthService.getCurrentUser()
  //GET Action 
  const [Inter, SetInter] = useState([]);
   //Select all interlocuteur
   const retrieveInterlocuteur = () => {
    AuthInterlocuteur.findAll()
      .then((response) => {
        SetInter(response.data);
       
      })
      .catch((e) => {
        console.log(e);
      });
  };



  useEffect(() =>{
    retrieveInterlocuteur()
  },[]);


//CARD TABLE 
  const card = (
    <React.Fragment>
      {Inter.map((e)=>
      <Card variant="outlined" >
      <CardContent>
         <Typography variant="h5" component="div">
         <i class='bx bxs-id-card'></i>: {e.id_interlocuteur }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Nom: {e.nom}
        </Typography>
        <Typography variant="body2">
         Fonction : {e.fonction_inter}
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Telephone :  {e.tel}
        </Typography>
      
       
    
       
      </CardContent>
      <CardActions>
        <Button href={`/Inter/modifier/${e.id_interlocuteur}`}   size="small">Modifier</Button>
      </CardActions>
      </Card>
       )}
      <CardActions>
        
        <Button href={`/`}  size="small">Retour</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box  sx={{ minWidth: 260 }}>
      <div>{card}</div>
    </Box>
  );

}

export default InterlocuteurDetails
