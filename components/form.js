import React, { useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, InputGroup, FormGroup, Label, Col, Input, Row, Button} from 'reactstrap';
import { Control, LocalForm, Errors} from "react-redux-form";
import Geocode from "react-geocode";
import Selector from './selector';
import { connect } from "react-redux";
import { payloadFunction} from "../src/actions/sampleAction";
import AutocompleteInput from './autocomplete';
import { API_KEY_GOOGLE_MAPS } from "gatsby-env-variables";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import changeOri from '../assets/images/exchange.png'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/form.css';
import useWindowDimensions from '../hooks/useWindowDimensions';
import backToForm from '../assets/images/back-arrow.png';
import { withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      zIndex:1
    },
  }))(Tooltip);



const Form_ = ({submit_Handler, payloadFunction}) => {
    const [origin, setAddress] = useState("");
    const [onsubmit, setOnsubmit] = useState(false);
    const inputOri = useRef(null);
    const inputDest = useRef(null);
    const refSelect = useRef(null);
    const { height, width } = useWindowDimensions();
    console.log(height, width);
    const toggle = () => {setOnsubmit(!onsubmit)}
    const handleChange = (value) => {
        setAddress(value);
    }
    const handleSelect = (value) => {
        setAddress(value);
    }
    const [destination, setAddressD] = useState("");
    const handleChangeD = (value) => {
        setAddressD(value);
    }
    const handleSelectD = (value) => {
        setAddressD(value);
    }
    var geocode = async(value) =>{
        Geocode.setApiKey(API_KEY_GOOGLE_MAPS);
        Geocode.setLanguage("es");
        try{
            var response = await Geocode.fromAddress(value);
            const { lat, lng } = await response.results[0].geometry.location;
            return {lat, lng}
        }catch(error){
            console.error(error);
        }
    }
    var submit = async (values) =>{
        var ori = await geocode(origin);
        var dest = await geocode(destination);
        if (!values.type){
            values.type = "MiniMula hasta 34 Ton";
        }
        setOnsubmit(true);
        console.log(refSelect.current);
        submit_Handler({origin: ori, destination: dest, type: values.type});
        payloadFunction({points:[ori,dest], vehicle: {name: values.type}});
    }
    var change = async () => {
        setAddress(inputDest.current.props.address); 
        setAddressD(inputOri.current.props.address); 
    }
    console.log(onsubmit);
    if (width < 600 && onsubmit === true){
        return(
            <LightTooltip title="Go Back to next trip" placement="top" arrow>
                  <Button color="ligth" onClick={toggle} className="backToForm" ><img width="30px" src={backToForm}/></Button>
            </LightTooltip>
        )
    }else {
        return (
            <div className="form">
                <LocalForm onSubmit={(values)=>submit(values)} className="contentForm" >
                    <Row>
                        <Col sm={4} md={4}>
                            <Button className="changeOrigins sm" color="ligth" type="button" onClick={change}><img width="24" src={changeOri}/></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>
                            <AutocompleteInput ref={inputOri} handleChange={handleChange} handleSelect={handleSelect} address={origin} key={1} placeholder="Start Location" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>
                            <AutocompleteInput ref={inputDest} handleChange={handleChangeD} handleSelect={handleSelectD} address={destination} key={2} placeholder="End Location" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>
                            <Selector refSelect={refSelect}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12}>
                            <Button type="submit" className="ml-auto" color="primary" className="m-2 buttom"><FontAwesomeIcon icon={faMapMarkedAlt}/> Search</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    darkMode: state.data.isDarkMode,
  })
  
export default connect(mapStateToProps, { payloadFunction})(Form_)
  