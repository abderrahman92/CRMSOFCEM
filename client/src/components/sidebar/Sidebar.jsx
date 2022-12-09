import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus"
import logo from '../../assets/images/sofitech.png'
import logoCemeca from '../../assets/images/logo-cemeca.png';
import  * as sidebareRoute from   '../../assets/JsonData/sidebareRoute';
import {SidebarItedes,SidebarIteact} from '../sidebar/SidebarItem'
import Loader from '../LoadingPage';

const Sidebar = props => {
    const active = props.active ? 'active' : '';
    const [new_sidbar, setSidbar] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [roleAdmin, setRoleAdmin] = useState([]);
    const [cemeca, setcemeca] = useState(false);
    const [sofitech, setSofitech] = useState(false);
    // Get  URL from window location
        const nameUrl = window.location.href.slice(21, 28)
       

    // DECONNECTION
        const logOut = () => {AuthService.logout()};
    // CONNECTION 
        const user = AuthService.getCurrentUser()
    // GET ROLE 
        const retrieveRole = () => {
        if (user) {
            const nouveaustate = [...new_sidbar]
            setCurrentUser(user)
            //user 
            nouveaustate.push(sidebareRoute.Tableaudebord, sidebareRoute.ajouter,sidebareRoute.Societes);
            const expr = nameUrl;
            
            UserService.getSofitechBoard().then(
                response => {
                   
                    setSofitech(true)
                    setcemeca(false)
                   

                },
                
                error => {
                    setSofitech(false)
                    setcemeca(true)
                   
                }
            );
            
            UserService.getAdminBoard().then(
                response => {
                    switch (expr) {
                        case '/Register':
        
                            nouveaustate.push(sidebareRoute.gestion,sidebareRoute.desinterlocuteur, sidebareRoute.desAction);
                            break;
                    }
                  
                    setRoleAdmin(response.data);
                   
                
                    
                    
                },
                error => {
                    setRoleAdmin({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });

                    if (error.response && error.response.status === 401) {
                        EventBus.dispatch("logout");
                    }
                }
            );
            if(roleAdmin){
                nouveaustate.push(sidebareRoute.gestion);
                setSidbar(nouveaustate)
            }
            switch (expr) {
                case '/Interl':

                    nouveaustate.push(sidebareRoute.interlocuteur, sidebareRoute.desAction);
                    break;

                case '/Action':
                    
                    nouveaustate.push(sidebareRoute.Action, sidebareRoute.desinterlocuteur);
                    break;
                case '/Societ':

                    nouveaustate.push(sidebareRoute.desAction, sidebareRoute.desinterlocuteur);
                    break;
                case '/Ajouter':

                    nouveaustate.push(sidebareRoute.desAction, sidebareRoute.desinterlocuteur);
                    break;
    
                case '/':

                    nouveaustate.push(sidebareRoute.desAction, sidebareRoute.desinterlocuteur);
                    break;



            }
            setSidbar(nouveaustate)

        }
        //DECONNECTION
        else{
            const nouveaustate = [...new_sidbar]
            nouveaustate.push(sidebareRoute.connexion);
            setSidbar(nouveaustate)
            console.log('test')
        }

        };
  
   
    useEffect(() => {     
            retrieveRole()   
    }, [])
    //ACTIVE LINK 
    const activeItem = new_sidbar.findIndex(item => item.route.includes(props.location.pathname))
    const activeItem2 = new_sidbar.findIndex(item => item.route === nameUrl)
    //FILTER SIDEBAR CONNECTION && DECONNECTION
    const desaItem = new_sidbar.filter(task => task.status === "desactive")
    const actItem = new_sidbar.filter(task => task.status === "active")

    const renderImage = () => {
        if (cemeca === true) {
            return <img src={logoCemeca} alt="company logo" />
        }
        else if (sofitech === true) {
            return <img src={logo} alt="company logo" />
        }
    }
  
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                {renderImage()}

            </div>
            {actItem.map((item, index) => (
                    <Link to={item.route} key={index}  >

                        <SidebarIteact key={index}
                            title={item.display_name}
                            icon={item.icon}
                            active={(index === activeItem2) || (index === activeItem)}

                        />
                    </Link>
                ))}
            {currentUser ? (
                <div>
                    {
                        desaItem.map((item, index) => (
                            <SidebarItedes key={index}
                                title={item.display_name}
                                icon={item.icon}
                                active={(index === activeItem2) || (index === activeItem)}

                            />
                        ))
                    }
                    <div className="sidebar__item">
                        <div className={`sidebar__item-inner${active}`}>
                            <i className='bx bxs-log-out'></i>
                            <a href="/login" className="nav-link" onClick={logOut}>Déconnexion</a>
                        </div>

                    </div>

                </div>


            ) : (
                <div className="sidebar__item">


                </div>
            )}
        </div>
    )
}

export default Sidebar

