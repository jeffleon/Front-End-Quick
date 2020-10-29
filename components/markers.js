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
import { faGasPump, faStopwatch , faRoad , faStore, faMoneyBillAlt} from '@fortawesome/free-solid-svg-icons';
import {dataPostFunction} from '../src/actions/sampleAction';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

const Markers = () => {
    const dataPost = useSelector((state)=> state.data.payload);
    console.log(dataPost);
    var [open, setOpen] = useState(null);
    var [open2, setOpen2] = useState(null);
    var [openFinish, setOpenFinish] = useState(false);
    var {data_post, error_post, loading_post} = usePost('https://api.fulldevs.software/routes/tolls', dataPost);
    
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
    var clickhandler = (index) => {
        setOpen(index)
    }
    var clickhandler2 = (index) => {
        setOpen2(index)
    }
    if (Array.isArray(data_post) !== true && data_post  && data && !data_post.error) {
        console.log(data_post);
        return(
            <>
            <AlertToast content="Enjoy your trip" type="success"/>
            <Marker 
                position={{ lat: dataPost.points[0].lat, lng: dataPost.points[0].lng}}
                options={{icon:`${truck}`}}>
            </Marker>
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
            <RenderCard data={data_post}/>
            
            {/**{data.data.tolls.map((element, index)=>
                <Marker key={index} position={{ lat: element.coordinates.lat, lng: element.coordinates.lng }}
                options={{icon:`${tollDisable}`}}
                onClick={()=>clickhandler2(index)}>
                {open2 === index &&<InfoWindow>
                        <div>
                            <h6>{element.name}</h6>
                        </div>
                    </InfoWindow>} 
                </Marker>
                )}**/}
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

export default connect(mapStateToProps,{dataPostFunction})(Markers);