import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  height: 7em;
  width: 15em;
  top: 0.5em;
  left: 0;
  background-color: #222222;
  border-radius: 10px;
  padding: 1em;
`;

const Name = styled.span`
  color: white;
  font-size: 1rem;

  font-weight: 300;
`;

const CaseTitle = styled.span`
  font-weight: 700;
  color: #989898;
`;

const TotalDeath = styled.span`
  color: ${props => props.color};
  font-weight: 700;
`;

const CountryCard = ({ country }) => {
  return (
    <Wrapper>
      <Name>{country.country}</Name>
      <div style={{ marginTop: '1em' }}>
        <CaseTitle>Cases: </CaseTitle>
        <TotalDeath color='#A6A6A6'>{country.cases}</TotalDeath>
      </div>
      <div>
        <CaseTitle>Deaths: </CaseTitle>
        <TotalDeath color='#B41736'>{country.deaths}</TotalDeath>
      </div>
    </Wrapper>
  );
};

export default CountryCard;
