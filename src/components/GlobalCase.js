import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const GlobalCase = ({ countries, global, lastUpdated }) => {
  useEffect(() => {
    console.log(dayjs().unix(lastUpdated));
  });

  const Wrapper = styled.div`
    padding: 0.5em;
    overflow: hidden;
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
    font-weight: ${props => props.weigth || '700'};
    font-size: ${props => props.size || '2rem'};
    line-height: ${props => props.line || '3rem'};
    text-align: ${props => props.align};
  `;

  const CaseWrapper = styled.div`
    width: 100%;
    background-color: #222222;
    height: calc(100% - 100px);
    padding: 1em;
    margin: 0.5em 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ce2727;
    }
  `;

  const Cases = styled.div``;

  const Case = styled.div`
    border-bottom: 1px solid #5c5c5c;
    display: flex;
    justify-content: space-between;
    padding: 0.3em;
  `;

  const Country = styled.div`
    color: #b3b3b3;
  `;

  return (
    <Wrapper>
      <Header>
        <Title>Global Cases</Title>
        <Total align='center'>{global}</Total>
      </Header>
      <CaseWrapper>
        <Title>Cases by Country</Title>
        <Cases>
          {countries.map((country, i) => (
            <Case key={`${country.country}+${i}`}>
              <Country>{country.country}</Country>
              <Total size='1.10rem' weigth='500' line='1rem'>
                {country.cases}
              </Total>
            </Case>
          ))}
        </Cases>
      </CaseWrapper>
    </Wrapper>
  );
};

export default GlobalCase;
