import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../helpers/helper';

const Wrapper = styled.div`
  padding: 0.5em;
  overflow: hidden;
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
  color: #f1faee;
  font-weight: 500;
  margin-bottom: 1em;
`;

const Total = styled.span`
  color: #f1faee;
  font-weight: ${props => props.weigth || '700'};
  font-size: ${props => props.size || '2rem'};
  line-height: ${props => props.line || '3rem'};
  text-align: ${props => props.align};
`;

const CaseWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #023e58;
  height: calc(100% - 100px);
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
    background-color: #14213d;
  }
`;

const Cases = styled.div``;

const Case = styled.div`
  border-bottom: 1px solid #5c5c5c;
  display: flex;
  justify-content: space-between;
  padding: 0.3em;
  &:hover {
    cursor: pointer;
  }
`;

const Country = styled.div`
  color: #588b8b;
`;

const GlobalCase = ({ countries, global, changeCenter }) => {
  return (
    <Wrapper>
      <Header>
        <Title>Global Cases</Title>
        <Total align='center'>{numberWithCommas(global)}</Total>
      </Header>
      <CaseWrapper>
        <Title>Cases by Country</Title>
        <Cases>
          {countries.map((country, i) => (
            <Case
              onClick={() => changeCenter(country)}
              key={`${country.country}+${i}`}
            >
              <Country>{country.country}</Country>
              <Total size='1.10rem' weigth='500' line='1rem'>
                {numberWithCommas(country.cases)}
              </Total>
            </Case>
          ))}
        </Cases>
      </CaseWrapper>
    </Wrapper>
  );
};

export default GlobalCase;
