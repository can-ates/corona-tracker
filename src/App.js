import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import GlobalCase from './components/GlobalCase';
import GlobalResult from './components/GlobalResult';
import CoronaMap from './components/Map';

const Container = styled.div`
  height: 100vh;
  background-color: #fafafa;
  display: grid;
  grid-template-columns: [global-case] 20% [corona-map] minmax(30%, 50%) [global-result] 30% [end];
  grid-template-rows: 100%;
`;

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [click, setClick] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://disease.sh/v3/covid-19/countries?yesterday=false&sort=cases'
      )
      .then(res => setData(res.data));
    axios
      .get('https://disease.sh/v3/covid-19/all?yesterday=false')
      .then(res => setTotal(res.data));
  }, []);

  const handleChange = country => {
    setClick(country);
  };

  return (
    <Container>
      <GlobalCase
        changeCenter={handleChange}
        countries={data}
        global={total.cases}
        lastUpdated={total.updated}
      />
      <CoronaMap total={total} data={data} click={click} />
      <GlobalResult total={total} data={data} />
    </Container>
  );
}

export default App;
