import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../helpers/helper';
import BarChart from './BarChart';

const GlobalWrapper = styled.div`
  padding: 0.5em;
  height: 50%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  background-color: #222222;
  padding: 1em;
  text-align: center;
`;

const Title = styled.span`
  text-align: center;
  display: block;
  color: whitesmoke;
  font-weight: 300;
  margin-bottom: 1em;
`;

const GlobalTotal = styled.span`
  color: ${props => props.color || '#e60000'};
  font-weight: ${props => props.weigth || '700'};
  font-size: ${props => props.size || '2rem'};
  line-height: ${props => props.line || '3rem'};
`;

const CaseWrapper = styled.div`
  width: 100%;
  background-color: #222222;
  padding: 1em;
  margin: 0.5em 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.scroll || '#ce2727'};
  }
`;
const CaseContainer = styled.div`
  display: flex;
  height: 70%;
`;

const Case = styled.div`
  border-bottom: 1px solid #5c5c5c;
  padding: 0.3em;
`;

const Country = styled.div`
  color: #b3b3b3;
`;

const GlobalResult = ({ total, data }) => {
  return (
    <GlobalWrapper>
      <HeaderWrapper>
        <Header style={{ marginRight: '0.5em' }}>
          <Title>Global Deaths</Title>
          <GlobalTotal color='red'>
            {numberWithCommas(total.deaths)}
          </GlobalTotal>
        </Header>
        <Header>
          <Title>Global Recovered</Title>
          <GlobalTotal color='green'>
            {numberWithCommas(total.recovered)}
          </GlobalTotal>
        </Header>
      </HeaderWrapper>

      <CaseContainer>
        <CaseWrapper scroll='red' style={{ marginRight: '0.5em' }}>
          <React.Fragment>
            {data.map((country, i) => (
              <Case key={`${country.country}+${i}`}>
                <GlobalTotal color='red' size='1rem' weigth='500' line='1rem'>
                  {numberWithCommas(country.deaths)}{' '}
                  <span style={{ fontWeight: '300', fontSize: '0.90rem' }}>
                    deaths
                  </span>
                </GlobalTotal>
                <Country>{country.country}</Country>
              </Case>
            ))}
          </React.Fragment>
        </CaseWrapper>

        <CaseWrapper scroll='green'>
          <React.Fragment>
            {data.map((country, i) => (
              <Case key={`${country.country}+${i}`}>
                <GlobalTotal color='green' size='1rem' weigth='500' line='1rem'>
                  {numberWithCommas(country.recovered)}{' '}
                  <span style={{ fontWeight: '300', fontSize: '0.90rem' }}>
                    recovered
                  </span>
                </GlobalTotal>
                <Country>{country.country}</Country>
              </Case>
            ))}
          </React.Fragment>
        </CaseWrapper>
      </CaseContainer>

      <div style={{ height: '100%' }}>
        <BarChart />
      </div>
    </GlobalWrapper>
  );
};

export default GlobalResult;
