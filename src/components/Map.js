import React, { useState, useEffect } from 'react';
import redCircle from '../assets/red-circle.png';
import { styles, markerSize } from '../helpers/helper';
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
      <div
        style={{
          height: `100%`,
          width: '100%',
          position: 'relative',
          paddingTop: '0.5em',
        }}
      />
    ),
    mapElement: <div style={{ height: `100%`, width: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [country, setCountry] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 46, lng: 2 });
  const [zoom, setZoom] = useState(3);
  const total = props.total;

  useEffect(() => {
    if (props.click) {
      setCoordinates({
        lat: props.click.countryInfo.lat,
        lng: props.click.countryInfo.long,
      });
      setModalOpen(true);
      setCountry(props.click);
    }
  }, [props.click]);

  const showModal = country => {
    setModalOpen(true);
    setCountry(country);
  };

  const changeCenter = coord => {
    setCoordinates({
      lat: coord.lat,
      lng: coord.long,
    });
    setZoom(5);
  };

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 46, lng: 2 }}
      center={coordinates}
      zoom={zoom}
      options={{
        zoomControl: false,
        disableDefaultUI: true,
        styles: styles,
        draggableCursor: 'cursor',
        draggingCursor: 'cursor',
      }}
    >
      {props.datas.map((data, i) => (
        <Marker
          onClick={() => {
            showModal(data);
            changeCenter(data.countryInfo);
          }}
          key={`${data.countryInfo._id} + ${i}`}
          position={{ lat: data.countryInfo.lat, lng: data.countryInfo.long }}
          icon={{
            url: redCircle,
            scaledSize: markerSize(total.cases, data.cases),
          }}
          opacity={0.8}
        />
      ))}

      {modalOpen && (
        <CountryCard country={country} closeModal={() => setModalOpen(false)} />
      )}
    </GoogleMap>
  );
});

const CoronaMap = props => {
  return (
    <React.Fragment>
      {props.data && props.total ? (
        <MyMapComponent
          datas={props.data}
          total={props.total}
          click={props.click}
        />
      ) : (
        <p>Loading</p>
      )}
    </React.Fragment>
  );
};

export default CoronaMap;
