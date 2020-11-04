import React from 'react';
import useFetch from '../hooks/usefetch';
import { Control, Errors} from "react-redux-form";

/* This is a component that is used like selector*/
const Selector = ({refSelect}) => {
    var  {data, loading, error} = useFetch('https://api.fulldevs.software/vehicles');
    /* this line allow do a fetch in a API that return a JSON that contain 
    a lot of clases of vehicles, this vehicles can be selected by the user */
    if (error){
        return(
            <div><p>Error!!!</p></div>
        )
    }
    if (loading){
        return(
            <div><p>Loading!!!</p></div>
        )
    }
    if (data) {
        return (
            <>
                <Control.select ref={refSelect} model=".type" id='type' name='type' className="form-control m-2 autoComInp" 
                validators={{
                    required: (val) => val !== 'Vehicle Type'
                }}>
                    {/* this part of code render all options catched by the fetch endpoint */}
                    <option disabled hidden selected>Vehicle Type</option>
                    {data.vehicles.map((value, index)=><option key={index}>{value.name}</option>)}
                </Control.select>
                <Errors className="errorForm"
                    model=".type"
                    className="text-danger"
                    show="touched"
                    messages={{
                        required: 'Please select a Valid vehicle type'
                    }}
                />
            </>
        )
    }
}

export default Selector;