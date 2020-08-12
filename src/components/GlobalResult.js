import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../helpers/helper';
import BarChart from './BarChart';

const GlobalWrapper = styled.div`
  padding: 0.5em;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  background-color: #023e58;
  padding: 1em;
  text-align: center;
  border-radius: 10px;
`;

const Title = styled.span`
  text-align: center;
  display: block;
  color: ${props => props.color || '#e60000'};
  font-weight: 500;
`;

const GlobalTotal = styled.span`
  color: ${props => props.color || '#e60000'};
  font-weight: ${props => props.weigth || '700'};
  font-size: ${props => props.size || '2rem'};
  line-height: ${props => props.line || '3rem'};
`;

const CaseWrapper = styled.div`
  width: 100%;
  background-color: #023e58;
  border-radius: 10px;
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
  height: 40%;
`;

const Case = styled.div`
  border-bottom: 1px solid #5c5c5c;
  padding: 0.3em;
`;

const Country = styled.div`
  color: #f1faee;
`;

const GlobalResult = ({ total, data }) => {
  return (
    <GlobalWrapper>
      <HeaderWrapper>
        <Header style={{ marginRight: '0.5em' }}>
          <Title color='#f28482'>Global Deaths</Title>
          <GlobalTotal color='#f28482'>
            {numberWithCommas(total.deaths)}
          </GlobalTotal>
        </Header>
        <Header>
          <Title color='#0ead69'>Global Recovered</Title>
          <GlobalTotal color='#0ead69'>
            {numberWithCommas(total.recovered)}
          </GlobalTotal>
        </Header>
      </HeaderWrapper>

      <CaseContainer>
        <CaseWrapper scroll='#f28482' style={{ marginRight: '0.5em' }}>
          <React.Fragment>
            {data.map((country, i) => (
              <Case key={`${country.country}+${i}`}>
                <GlobalTotal
                  color='#f28482'
                  size='1rem'
                  weigth='700'
                  line='1rem'
                >
                  {numberWithCommas(country.deaths)}{' '}
                  <span style={{ fontWeight: '500', fontSize: '0.90rem' }}>
                    deaths
                  </span>
                </GlobalTotal>
                <Country>{country.country}</Country>
              </Case>
            ))}
          </React.Fragment>
        </CaseWrapper>

        <CaseWrapper scroll='#0ead69'>
          <React.Fragment>
            {data.map((country, i) => (
              <Case key={`${country.country}+${i}`}>
                <GlobalTotal
                  color='#0ead69'
                  size='1rem'
                  weigth='700'
                  line='1rem'
                >
                  {numberWithCommas(country.recovered)}{' '}
                  <span style={{ fontWeight: '500', fontSize: '0.90rem' }}>
                    recovered
                  </span>
                </GlobalTotal>
                <Country>{country.country}</Country>
              </Case>
            ))}
          </React.Fragment>
        </CaseWrapper>
      </CaseContainer>

      <div>
        <BarChart />
      </div>
      <div>
        <Header>
          <Title color='#588b8b'>Last Updated</Title>
          <GlobalTotal size='1rem' line='1.5rem' weigth='500' color='#588b8b'>
            {new Date(total.updated).toLocaleString()}
          </GlobalTotal>
        </Header>
      </div>
    </GlobalWrapper>
  );
};

export default GlobalResult;
