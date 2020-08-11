import React from 'react';
import styled from 'styled-components';

const CountryCard = ({ country }) => {
  const Wrapper = styled.div`
    position: absolute;
    height: 7em;
    width: 15em;
    top: 0;
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

  const Title = styled.span`
    font-weight: 700;
    color: #989898;
  `;

  const Total = styled.span`
    color: ${props => props.color};
    font-weight: 700;
  `;

  return (
    <Wrapper>
      <Name>{country.country}</Name>
      <div style={{ marginTop: '1em' }}>
        <Title>Cases: </Title>
        <Total color='#A6A6A6'>{country.cases}</Total>
      </div>
      <div>
        <Title>Deaths: </Title>
        <Total color='#B41736'>{country.deaths}</Total>
      </div>
    </Wrapper>
  );
};

export default CountryCard;