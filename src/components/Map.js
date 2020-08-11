import React, { useState, useEffect } from 'react';
import redCircle from '../assets/red-circle.svg';
import { styles } from '../helpers/mapTheme';
import axios from 'axios';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places&language=en`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px`, width: '700px' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const total = props.total;
  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 46, lng: 2 }}
      options={{
        zoomControl: false,
        disableDefaultUI: true,
        styles: styles,
      }}
      onZoomChanged={props.handleZoom}
    >
      {props.datas.map((data, i) => (
        <Marker
          key={`${data.countryInfo._id} + ${i}`}
          position={{ lat: data.countryInfo.lat, lng: data.countryInfo.long }}
          icon={{
            url: redCircle,
            scaledSize: new window.google.maps.Size(((total.cases % data.cases).toString().length) * 6, 15, 'px' , 'px'),
          }}
        />
      ))}
    </GoogleMap>
  );
});

const CoronaMap = props => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries?yesterday=0&sort=cases')
      .then(res => setData(res.data));
    axios
      .get('https://disease.sh/v3/covid-19/all?yesterday=false')
      .then(res => setTotal(res.data));
  }, []);

  const zoomChanged = () => {
    setData([]);
    axios
      .get('https://disease.sh/v3/covid-19/countries?yesterday=0&sort=cases')
      .then(res => setData(res.data));
  };

  return (
    <React.Fragment>
      {data && total ? (
        <MyMapComponent datas={data} total={total} handleZoom={zoomChanged} />
      ) : (
        <p>Loading</p>
      )}
    </React.Fragment>
  );
};

export default CoronaMap;
