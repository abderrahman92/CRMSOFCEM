import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import StatusCard from '../components/status-card/StatusCard'
import Moment from 'react-moment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'moment/locale/fr';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
//table class
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@material-ui/core/TablePagination';

//controlleurs 
import UserService from "../services/user.service";
import AuthAction from "../services/Action";




const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)


const orderStatus = {
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)



const Dashboard = () => {
    //admin user 
    const [IsAdmin, setIsAdmin] = useState(undefined);

    //liste des societer
    const [ListTest, SetTest] = useState([]);
    const [Cemeca, SetIscemeca] = useState(false);

    //afficher le user actuelle 
    const [currentUser, setCurrentUser] = useState([]);

    //liste des actions 
    const [Action, SetAction] = useState([]);
    const Action_util = Action.filter(task => task.id_utili === currentUser.id)
    Action_util.sort((b, a) =>  new Date(a.date_rdv).getTime() - new Date(b.date_rdv).getTime());



    useEffect(() => {
        const user = AuthService.getCurrentUser();
        

        if (user) {
            //Role ADMIN
            UserService.getAdminBoard().then(
                () => {

                    setIsAdmin(true)
                },
                error => {
                    setIsAdmin(false);
                }
            );
            //ACTION 
            AuthAction.findAll().then((response) => {
                SetAction(response.data)
            })
                .catch((e) => {
                    console.log(e);
                });


            setCurrentUser(user)
            //afficher cemca
            UserService.getCemecaBoard().then(
                response => {
                    axios.get("http://localhost:8080/cemeca").then((response) => {
                        SetTest(response.data);
                        SetIscemeca(true)
                    })
                },



            );
            //afficher cemca
            UserService.getSofitechBoard().then(
                response => {
                    axios.get("http://localhost:8080/sofitech").then((response) => {
                        SetTest(response.data);
                        console.log(ListTest)
                    })
                },



            );

        }
    }, [])

    // date time input field Action
    const event = new Date();

    event.setMonth(event.getMonth() + 1);


    const [valueDate1, setValueDate1] = React.useState();
    const [valueDate2, setValueDate2] = React.useState(event);

    const handleChangeDate1 = (newValue) => {
        setValueDate1(newValue);
    };
    const handleChangeDate2 = (newValue) => {
        setValueDate2(newValue);
    };
    //tableau charte 
    const [tableau_date, tableau] = useState([]);

    const mysn = 1000 * 3600 * 24
    const fltr_date = Action.filter(task => (((new Date(task.date_rdv) - valueDate2) / mysn) < 0) && ((new Date(task.date_rdv) - valueDate1) / mysn) > 0)
    const filtre_date_Action_util1 = fltr_date.filter(task => task.id_utili === currentUser.id)
    //filter Month action
    //month jan 
    const fltrjan = Action.filter(task => (((new Date(task.date_action)).getMonth() === 0)))
    //month fev 
    const fltrfev = Action.filter(task => (((new Date(task.date_action)).getMonth() === 1)))
    //month mar 
    const fltrmar = Action.filter(task => (((new Date(task.date_action)).getMonth() === 2)))
    //month jan 
    const fltravr = Action.filter(task => (((new Date(task.date_action)).getMonth() === 3)))
    //month jan 
    const fltrmai = Action.filter(task => (((new Date(task.date_action)).getMonth() === 4)))
    //month jan 
    const fltrjun = Action.filter(task => (((new Date(task.date_action)).getMonth() === 5)))
    //month jan 
    const fltrjul = Action.filter(task => (((new Date(task.date_action)).getMonth() === 6)))
    //month jan 
    const fltrout = Action.filter(task => (((new Date(task.date_action)).getMonth() === 7)))
    //month jan 
    const fltrsep = Action.filter(task => (((new Date(task.date_action)).getMonth() === 8)))
    //month oct 
    const fltroct = Action.filter(task => (((new Date(task.date_action)).getMonth() === 9)))
    //month nov 
    const fltrnov = Action.filter(task => (((new Date(task.date_action)).getMonth() === 10)))
    //month dec 
    const fltrdec = Action.filter(task => (((new Date(task.date_action)).getMonth() === 11)))

    //filter Month action
    //month jan 
    const fltrSjan = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 0)))
    //month fev 
    const fltrSfev = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 1)))
    //month mar 
    const fltrSmar = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 2)))
    //month jan 
    const fltrSavr = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 3)))
    //month jan 
    const fltrSmai = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 4)))
    //month jan 
    const fltrSjun = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 5)))
    //month jan 
    const fltrSjul = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 6)))
    //month jan 
    const fltrSout = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 7)))
    //month jan 
    const fltrSsep = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 8)))
    //month oct 
    const fltrSoct = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 9)))
    //month nov 
    const fltrSnov = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 10)))
    //month dec 
    const fltrSdec = ListTest.filter(task => (((new Date(task.createdAt)).getMonth() === 11)))






    const chartOptions = {
        series: [{
            name: 'action ',
            data: [fltrjan.length, fltrfev.length, fltrmar.length, fltravr.length, fltrmai.length, fltrjun.length, fltrjul.length, fltrout.length, fltrsep.length, fltroct.length, fltrnov.length, fltrdec.length]
        },
        {
            name: 'sociétées ajouté ',
            data: [fltrSjan.length, fltrSfev.length, fltrSmar.length, fltrSavr.length, fltrSmai.length, fltrSjun.length, fltrSjul.length, fltrSout.length, fltrSsep.length, fltrSoct.length, fltrSnov.length, fltrSdec.length]
        }],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }





    //carde action user
    const statusCard = [
        {
            "icon": "bx bx-bar-chart-alt",
            "count": filtre_date_Action_util1.length,
            "title": "Vos Activités "
        }
    ]
    //card acrion admin
    const statusCardAdmin = [

        {
            "icon": "bx bxs-user-detail",
            "count": fltr_date.length,
            "title": "Activités commerciales"
        }
    ]

    //contrats
    const StatusContrat = [
        {
            "icon": "bx bxs-contact",
            "count": 0,
            "title": "Sociétaire SOFITECH "
        }
    ]

    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (

        <div>
            {/* si le client est connecter*/}
            {currentUser ? (
                <div>
                    <h2 className="page-header">Tableau de bord
                    </h2>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="row">

                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6">
                                        <LocalizationProvider dateAdapter={AdapterMoment} >

                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="Date debut d'action"
                                                    value={valueDate1}
                                                    onChange={handleChangeDate1}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>

                                    <div className="col-6">
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="Date fin d'action"
                                                    value={valueDate2}
                                                    onChange={handleChangeDate2}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                    <div className="row">
                        {/* carte des actions  */}
                        <div className="col-6">
                            <div className="row">
                                <div>
                                    {IsAdmin ? (
                                        <div className='row'>
                                            {
                                                statusCard.map((item, index) => (
                                                    <div className="col-6" key={index}>
                                                        <a href="Action/">
                                                            <StatusCard
                                                                icon={item.icon}
                                                                count={item.count}
                                                                title={item.title}
                                                            />
                                                        </a>
                                                    </div>
                                                ))  
                                            }
                                            {
                                                statusCardAdmin.map((item, index) => (
                                                    <div className="col-6" key={index}>
                                                        <a href="Action/">
                                                            <StatusCard
                                                                icon={item.icon}
                                                                count={item.count}
                                                                title={item.title}
                                                            />
                                                        </a>
                                                    </div>
                                                ))  
                                            }

                                        </div>
                                  
                                       

                                    ) : (
                                        <div>
                                            {
                                                statusCard.map((item, index) => (
                                                    
                                                        <div className="row justify-content-md-center">
                                                            <div className="col-6" key={index}>
                                                                <a href="#">
                                                                    <StatusCard
                                                                        icon={item.icon}
                                                                        count={item.count}
                                                                        title={item.title}
                                                                    />
                                                                </a>
                                                            </div>
                                                        </div>

                                                   
                                                ))
                                            }
                                        </div>

                                    )}
                                </div>



                            </div>
                        </div>
                        {/* chart graphique des clients  */}
                        <div className="col-6">
                            <div className="card full-height">

                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions.options,
                                        theme: { mode: 'dark' }
                                    } : {
                                        ...chartOptions.options,
                                        theme: { mode: 'light' }
                                    }}
                                    series={chartOptions.series}
                                    type='line'
                                    height='100%'
                                />
                            </div>
                        </div>
                        {/* cart des societe clientes  */}
                        {
                            StatusContrat.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <div className="row justify-content-md-center">
                                        <div className="col-6" key={index}>
                                            <a href="#">
                                                <StatusCard
                                                    icon={item.icon}
                                                    count={item.count}
                                                    title={item.title}
                                                />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                        <div className="col-6">
                            <div className="card full-height">
                                {/* chart */}
                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions.options,
                                        theme: { mode: 'dark' }
                                    } : {
                                        ...chartOptions.options,
                                        theme: { mode: 'light' }
                                    }}
                                    series={chartOptions.series}
                                    type='line'
                                    height='100%'
                                />
                            </div>
                        </div>
                        {/* dernier societe cree */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card__header">
                                    <h3>Sociétées</h3>
                                </div>
                                <div className="card__body">


                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>siret</TableCell>
                                                    <TableCell align="right">nom_soc</TableCell>
                                                    <TableCell align="right">observation</TableCell>
                                                    <TableCell align="right">adresse postal</TableCell>
                                                    <TableCell align="right">date ajouté</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ListTest.map((row,index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.siret}
                                                        </TableCell>
                                                        <TableCell align="right">{row.nom_soc}</TableCell>
                                                        <TableCell align="right">{row.observation}</TableCell>
                                                        <TableCell align="right">{row.adresse_local}</TableCell>
                                                        <TableCell align="right"> <Moment fromNow>{row.createdAt}</Moment></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[2, 5, 10]}
                                        component="div"
                                        count={ListTest.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />

                                </div>
                                <div className="card__footer">
                                    <Link to='Societes'>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                        {/* dernier action cree */}
                        <div className="col-6">
                            <div className="card">
                                <div className="card__header">
                                    <h3>Activités commerciales</h3>
                                </div>
                                <div className="card__body">


                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="right">Nom société</TableCell>
                                                    <TableCell align="right">Date du RDV</TableCell>
                                                    <TableCell align="right">Nom interlocuteur</TableCell>
                                                    <TableCell align="right">Type d'action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Action_util.map((row,index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.nom_societe}
                                                        </TableCell>
                                                        <TableCell align="right">{moment(row.date_rdv).format("DD  MMMM YYYY HH:mm")}</TableCell>
                                                        <TableCell align="right">{row.nom_interlocuteur}</TableCell>
                                                        <TableCell align="right"> {row.type_action}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                                <div className="card__footer">
                                    <Link to='Societes'>Plus info</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            ) :

                (
                    <div className="sidebar__item">
                        <div disabled className={`sidebar__item-inner `}>
                            <i className='bx bxs-user-x' ></i>
                            <span >
                                pas connecter
                            </span>
                        </div>

                    </div>
                )}
        </div>
    )
}

export default Dashboard
