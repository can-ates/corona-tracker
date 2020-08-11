import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const GlobalCase = ({ countries, global, lastUpdated }) => {
  useEffect(() => {
    console.log(dayjs().unix(lastUpdated));
  });

  const Wrapper = styled.div`
    padding: 0.5em;
    height: 100%;
    overflow: auto;
  `;

  const Header = styled.div`
    width: 100%;
    background-color: #222222;
    padding: 1em;
  `;

  const Title = styled.span`
    text-align: center;
    display: block;
    color: whitesmoke;
    font-weight: 300;
  `;

  const Total = styled.span`
    color: #e60000;
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: ${props => props.size || '2rem'};
    line-height: ${props => props.line || '3rem'};
  `;

  const CaseWrapper = styled.div`
    width: 100%;
    background-color: #222222;
    padding: 1em;
    margin-top: 0.5em;
  `;

  const Cases = styled.div`
    overflow: auto;
    height: 100%;
  `;

  const Case = styled.div`
    border-bottom: 1px solid #5c5c5c;
  `;

  const Country = styled.div`
    margin-left: auto;
    color: #b3b3b3;
  `;

  return (
    <Wrapper>
      <Header>
        <Title>Global Cases</Title>
        <Total>{global}</Total>
        <p></p>
      </Header>
      <CaseWrapper>
        <Title>Cases by Country</Title>
        <Cases>
          {countries.map((country, i) => (
            <Case key={`${country.country}+${i}`}>
              <Total size='1rem' line='1rem'>
                {country.cases}
              </Total>
              <Country>{country.country}</Country>
            </Case>
          ))}
        </Cases>
      </CaseWrapper>
    </Wrapper>
  );
};

export default GlobalCase;
