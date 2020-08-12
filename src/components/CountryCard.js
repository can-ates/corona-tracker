import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  height: 7em;
  width: 15em;
  top: 0.5em;
  left: 0;
  background-color: #0e1626;
  border-radius: 10px;
  padding: 1em;
`;

const Name = styled.span`
  font-size: 1rem;
  color: #f1faee;
  font-weight: 500;
`;

const CaseTitle = styled.span`
  font-weight: 700;
  color: #989898;
`;

const Total = styled.span`
  color: ${props => props.color};
  font-weight: 700;
`;

const CountryCard = ({ country }) => {
  return (
    <Wrapper>
      <Name>{country.country}</Name>
      <div style={{ marginTop: '1em' }}>
        <CaseTitle>Cases: </CaseTitle>
        <Total color='#f1faee'>{country.cases}</Total>
      </div>
      <div>
        <CaseTitle>Deaths: </CaseTitle>
        <Total color='#e63946'>{country.deaths}</Total>
      </div>
      <div>
        <CaseTitle>Recovered: </CaseTitle>
        <Total color='#0ead69'>
          {country.recovered === 0 ? (
            <span>Not shared</span>
          ) : (
            country.recovered
          )}
        </Total>
      </div>
    </Wrapper>
  );
};

export default CountryCard;
