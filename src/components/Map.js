import React, { useState, useEffect } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

const CoronaMap = props => {
  const [markerShown, setMarkerShown] = useState(false);

  const delayedShowMarker = () => {
    setTimeout(() => {
      setMarkerShown(true);
    }, 3000);
  };

  const handleMarkerClick = () => {
    setMarkerShown(false);
    delayedShowMarker();
  };

  return (
    <MyMapComponent
      isMarkerShown={markerShown}
      onMarkerClick={handleMarkerClick}
    />
  );
};

export default CoronaMap;
