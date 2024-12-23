import React from 'react';
import Geocode from "react-geocode";
import { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css'
import { GeoAltFill } from 'react-bootstrap-icons';

const AnyReactComponent = () => <GeoAltFill size={25}></GeoAltFill>;

function Map(props)
{
    const[loc, setLoc] = useState([]);

    const autocompleteRef = useRef(null);

    Geocode.setApiKey("AIzaSyArGT7JyVPuzq-IqsBSvN-3xfv_rhWfKWk");
    Geocode.setLanguage("en");
    Geocode.setRegion("pk");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug(true);

    useEffect(() => {
            // Get latitude & longitude from address.
            Geocode.fromAddress(props.add + ", " + props.city).then(
                (response) => {
                    setLoc(response.results[0].geometry.location);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, [])

      const handleApiLoaded = (map, maps) => {
        // use map and maps objects
      };

      const defaultProps = {
        zoom: 16
      };

    return(
        <>
                <div className='mapSec p-0'>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyArGT7JyVPuzq-IqsBSvN-3xfv_rhWfKWk"}}
                        center={{lat: loc.lat, lng:loc.lng}}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}ß
                        >
                        <AnyReactComponent
                            lat={loc.lat1} 
                            lng={loc.lng}
                            text=""
                        />
                    </GoogleMapReact>
                </div>
        </>
    );
}

export default Map;