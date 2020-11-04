import React, { useState} from 'react';
import { Marker, InfoWindow} from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.css';
import {useSelector} from 'react-redux';
import usePost from '../hooks/usePost';
import Loading from '../src/pages/Loading'
import useFetch from '../hooks/usefetch';
import tollImage from '../assets/images/toll.png';
import truck from '../assets/images/truck.png';
import finish from '../assets/images/finish.png';
import RenderCard from './RenderCard';
import {connect} from 'react-redux';
import AlertToast from './AlertToast';
import { withStyles} from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tollDisable from '../assets/images/riot-police.png'
import { faGasPump, faStopwatch , faRoad , faStore, faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);
/* Markers Component render the markers and results when the user put the origin and destination */
const Markers = () => {
    /* use the hook to get the state payload of redux */
    const dataPost = useSelector((state)=> state.data.payload);
    /* this handle the IDs of tolls to do a pop up and display the name of the toll in route */
    var [open, setOpen] = useState(null);
    /* this handle the all tolls to do a pop up and display the name of the toll */
    var [open2, setOpen2] = useState(null);
    /* this handle the finish icon to display the results */
    var [openFinish, setOpenFinish] = useState(false);
    /* use this custome hook to do a post from API of tolls and get a json data about the tools in routes and costs */
    var {data_post, error_post, loading_post} = usePost('https://api.fulldevs.software/routes/tolls', dataPost);
    /* this fetch its only for do a test with all tolls*/
    var {data, error, loading} = useFetch('https://api.fulldevs.software/tolls');
    if (error && error_post){
        return(
            <p>Error!!!</p>
        ) 
    }
    if (loading && loading_post){
        return(
            <Loading/>
        ) 
    }
    /* handlers to do a popup in the map */
    var clickhandler = (index) => {
        setOpen(index)
    }
    var clickhandler2 = (index) => {
        setOpen2(index)
    }
    /* ********************************* */
    if (Array.isArray(data_post) !== true && data_post  && data && !data_post.error) {
        console.log(data_post);
        return(
            <>
            {/* if the datapost its ok return a toast alert successful */}
            <AlertToast content="Enjoy your trip" type="success"/>
            {/* marker where the trip begin */}
            <Marker 
                position={{ lat: dataPost.points[0].lat, lng: dataPost.points[0].lng}}
                options={{icon:`${truck}`}}>
            </Marker>
            {/* marker where the trip finish */}
            <Marker
                onClick={() => {
                    setOpenFinish(!openFinish);
                 }}
                position={{ lat: dataPost.points[1].lat, lng: dataPost.points[1].lng}}
                options={{icon:`${finish}`}}>
                {openFinish&&<InfoWindow
                     position={{
                        lat: dataPost.points[1].lat,
                        lng: dataPost.points[1].lng
                     }}
                    >
                    {/* all information about the trip ,fuel cost ,toll cost etc */}
                    <div>
                        <LightTooltip title="Distance" placement="left" arrow>
                            <p className="cardDisCom"> <FontAwesomeIcon icon={faRoad} /> <span className="ml-2">{data_post.total_kms}Km </span></p>
                        </LightTooltip>
                        <LightTooltip title="Duration" placement="left" arrow>
                            <p className="cardDisCom"> <FontAwesomeIcon icon={faStopwatch} /> <span className="ml-2"> {data_post.duration.replace('hours','H').replace('mins',"Min")} </span></p>
                        </LightTooltip>
                        <LightTooltip title="Toll Expenses" placement="left" arrow>
                            <p className="cardDisCom">  <FontAwesomeIcon icon={faStore}/> <span className="ml-2"> ${data_post.toll_expenses.total} </span></p>
                        </LightTooltip>
                        <LightTooltip title="Fuel Cost" placement="left" arrow>
                            <p className="cardDisCom"> <FontAwesomeIcon icon={faGasPump}/> <span className="ml-2"> ${data_post.total_fuel_cost} </span></p>
                        </LightTooltip>
                        <LightTooltip title="Vehicle Expenses" placement="left" arrow>
                            <p className="cardDisCom"> <FontAwesomeIcon icon={faMoneyBillAlt}/> <span className="ml-2">${data_post.total_vehicle_expenses}</span></p>
                        </LightTooltip>
                    </div>
                </InfoWindow>}
            </Marker>
            {/* this is the tolls in route */}
            {data_post.tolls.map((toll, index)=>
            <Marker
                key={index} position={{ lat: toll.coordinates.lat, lng: toll.coordinates.lng }}
                options={{icon:`${tollImage}`}}
                onClick={()=>clickhandler(index)}
                >
                {open === index &&<InfoWindow>
                    <div>
                        <p className="cardDisCom">{toll.name}</p>
                        <p className="cardDisCom">${data_post.toll_expenses.byTolls[index]}</p>
                    </div>
                </InfoWindow>} 
            </Marker>)}
            {/* component to render the results in general duration, list of tolls in detail */}
            <RenderCard data={data_post}/>
            {/* this only work when we do test and display if the route has all tolls that we expect 
                this render all tolls that was inside the database will be shown    
            */}
            {data.data.tolls.map((element, index)=>
                <Marker key={index} position={{ lat: element.coordinates.lat, lng: element.coordinates.lng }}
                options={{icon:`${tollDisable}`}}
                onClick={()=>clickhandler2(index)}>
                {open2 === index &&<InfoWindow>
                        <div>
                            <h6>{element.name}</h6>
                        </div>
                    </InfoWindow>} 
                </Marker>
            )}
        </>
        )
    }else{
        return(
           <div></div>
        )
    }
}

const mapStateToProps = state => ({
    darkMode: state.data.isDarkMode,
  })

export default connect(mapStateToProps)(Markers);