import React, { useState } from 'react';
import redCircle from '../assets/red-circle.svg';
import { styles } from '../helpers/helper';
import axios from 'axios';
import CountryCard from './CountryCard';
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
    containerElement: (
      <div style={{ height: `100%`, width: '100%', position: 'relative' }} />
    ),
    mapElement: <div style={{ height: `100%`, width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [country, setCountry] = useState('');
  const total = props.total;

  const showModal = country => {
    setModalOpen(true);
    setCountry(country);
  };

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 46, lng: 2 }}
      options={{
        zoomControl: false,
        disableDefaultUI: true,
        styles: styles,
        draggableCursor: 'cursor',
        draggingCursor: 'cursor',
      }}
      onZoomChanged={props.handleZoom}
    >
      {modalOpen && (
        <CountryCard country={country} closeModal={() => setModalOpen(false)} />
      )}

      {props.datas.map((data, i) => (
        <Marker
          onClick={() => showModal(data)}
          key={`${data.countryInfo._id} + ${i}`}
          position={{ lat: data.countryInfo.lat, lng: data.countryInfo.long }}
          icon={{
            url: redCircle,
            scaledSize: new window.google.maps.Size(
              (total.cases % data.cases).toString().length * 6,
              7,
              'px',
              'px'
            ),
          }}
        />
      ))}
    </GoogleMap>
  );
});

const CoronaMap = props => {
  const [data, setData] = useState(props.data);

  const zoomChanged = () => {
    setData([]);
    axios
      .get('https://disease.sh/v3/covid-19/countries?yesterday=0&sort=cases')
      .then(res => setData(res.data));
  };

  return (
    <React.Fragment>
      {data && props.total ? (
        <MyMapComponent
          datas={data}
          total={props.total}
          handleZoom={zoomChanged}
        />
      ) : (
        <p>Loading</p>
      )}
    </React.Fragment>
  );
};

export default CoronaMap;
