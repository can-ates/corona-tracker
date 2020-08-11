import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';
import { numberWithCommas } from './helpers/helper';
import GlobalCase from './components/GlobalCase';
import GlobalResult from './components/GlobalResult';
import CoronaMap from './components/Map';

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries?yesterday=0&sort=cases')
      .then(res => setData(res.data));
    axios
      .get('https://disease.sh/v3/covid-19/all?yesterday=false')
      .then(res => setTotal(res.data));
  }, []);

  const Container = styled.div`
    height: 100vh;
    background-color: black;
    display: grid;
    grid-template-columns: [global-case] 20% [corona-map] minmax(30%, 52.5%) [global-result] 27.5% [end];
    grid-template-rows: 100%;
  `;

  return (
    <Container>
      <GlobalCase
        countries={data}
        global={numberWithCommas(total.cases)}
        lastUpdated={total.updated}
      />
      <CoronaMap total={total} data={data} />
      <GlobalResult total={total} data={data} />
    </Container>
  );
}

export default App;
