import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import { Input } from 'reactstrap';
import { API_KEY_GOOGLE_MAPS } from "gatsby-env-variables";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/autocomplete.css'

/* this component allow us a autocomplete of places with the API of google named places */
const AutocompleteInput = ({ isScriptLoaded, isScriptLoadSucceed, handleChange, handleSelect, address, key, placeholder}) => {
    if (isScriptLoaded && isScriptLoadSucceed)
    {
        return(
            <div>
               <PlacesAutocomplete 
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                    }) => (
                        <div>
                        <Input className="m-2 autoComInp" key={key}
                            {...getInputProps({
                            placeholder: `${placeholder}`,
                            })}
                        />

                        <div className="componentSuggestion">
                            {loading && <div>Loading...</div>}
                            {/* suggestions to be mapped and display for user */}
                            {suggestions.map((suggestion, index) => {
                            const style = suggestion.active
                                ? { backgroundColor: "#b8b894", cursor: "pointer" }
                                : { backgroundColor: "#ffffff", cursor: "pointer" };

                            return (
                                <div className="suggestion" {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                    <FontAwesomeIcon className="m-1" icon={faMapMarkerAlt} />
                                    {suggestion.description}
                                </div>
                            );
                            })}
                        </div>
                    </div>
                    )}                    
                </PlacesAutocomplete> 
            </div>
        )
    }
    else {
        return(
            <div></div>
        )
    }
}

// for do this the best way, we need to load a script that has the API key of the api of google places
export default scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE_MAPS}&libraries=places`)(AutocompleteInput);