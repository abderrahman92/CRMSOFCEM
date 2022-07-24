import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import AuthService from "../../services/auth.service";

import UserService from "../../services/user.service";

import EventBus from "../../common/EventBus"

import logo from '../../assets/images/sofitech.png'

import logoCemeca from '../../assets/images/logo-cemeca.png'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import { useParams } from "react-router-dom";
import Role from '../../services/role'

import axios from "axios";
import role from '../../services/role';
 
//sidabr desactivation parametres
const SidebarItedes = props => {

    const desactive = props.desactive ? '' : 'desactive';

    return (
        <div  className="sidebar__item">
            <div disabled  className={`sidebar__item-inner ${desactive}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>           
            </div>  
        </div>  
    )
}
//sidabr activation parametres
const SidebarIteact = props => {

    const active = props.active ? 'active' : '';

    return (
        <div disabled className="sidebar__item">
            <div  disabled  className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span >
                    {props.title}
                    {props.status}
                </span>                
            </div>
        </div>
        
    )
}
const logOut = () => {
    AuthService.logout();
  };
const Sidebar = props => {

    const active = props.active ? 'active' : '';
    const [new_sidbar,setSidbar]=useState(sidebar_items);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [adminstate, setadminstate] = useState(undefined);
    const [roleAuth,setRoleAuth] = useState([]);
    const [cemeca,setcemeca] = useState(false);
    const [sofitech,setSofitech] = useState(false);

    // Get ID from URL
        const params = useParams(); 
        console.log(params)
      
        

    // GET USER 
    const user = AuthService.getCurrentUser()
    //GET ROLE 
    const retrieveRole = () => {

        if(user){
            UserService.getSofitechBoard().then(
                response => {
                    setSofitech(true)
                    setcemeca(false)
                    setRoleAuth(response.data);
                    
                },
                error => {
                    setSofitech(false)
                    setcemeca(true)
                    setRoleAuth({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                }
              );
           
         }

      }; 

    //FILTER USER WHERE ROLE

    console.log(roleAuth)
   
     useEffect(()=>{ 
        const user = AuthService.getCurrentUser()
            if (user){
                retrieveRole();
                const nouveaustate = [...new_sidbar]
                UserService.getAdminBoard().then(
                    response => {
                        nouveaustate[7].status = "desactive"
                        nouveaustate[2].status = "active"
                        nouveaustate[8].status = "active"
                        setadminstate({
                        content: response.data
                        
                      });
                    },
                    error => {
                        setadminstate({
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
                nouveaustate[7].status = "desactive"
                nouveaustate[0].status = "active"
                nouveaustate[2].status = "active"
                nouveaustate[1].status = "active"
                setSidbar(nouveaustate) 
                setCurrentUser(user) 
            }
     },[]) 

 
    const activeItem = new_sidbar.findIndex(item => item.route === props.location.pathname)
     
      //login desactiver
      const desaItem =new_sidbar.filter(task=>task.status==="desactive")
      const actItem =new_sidbar.filter(task=>task.status==="active")

     const renderElement = () =>{
      if (cemeca === true){
          return <img  src={logoCemeca} alt="company logo" />
      }
      else if (sofitech === true) {
      return <img  src={logo} alt="company logo" />
    }
     }
    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                {renderElement()}

            </div>
            {
                actItem.map((item, index) => (
                    <Link  to={item.route} key={index}>
                       
                        <SidebarIteact
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                           
                        />
                    </Link>
                ))
            },
         ,{currentUser ?(
                <div>
                    {
                        desaItem.map((item, index) => (
                                <SidebarItedes
                                    title={item.display_name}
                                    icon={item.icon}
                                    active={index === activeItem}
                                
                                />
                        )) 
                    }
                    <div  className="sidebar__item">
                        <div  className={`sidebar__item-inner${active}`}>
                        <i className='bx bxs-log-out'></i>
                            <a href="/login" className="nav-link" onClick={logOut}>Déconnexion</a>
                        </div>
                    
                    </div>
                
                </div> 
                
                
              ): (
                <div  className="sidebar__item">
                  
                    
                </div>
              )}
        </div>
    )
}

export default Sidebar
