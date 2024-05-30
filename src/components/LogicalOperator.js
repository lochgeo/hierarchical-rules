// src/components/LogicalOperator.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  ${(props) => props.active && `
    background-color: #0056b3;
  `}
`;

const LogicalOperator = ({ operator, onChange }) => {
  return (
    <Container>
      <Button active={operator === 'AND'} onClick={() => onChange('AND')}>AND</Button>
      <Button active={operator === 'OR'} onClick={() => onChange('OR')}>OR</Button>
    </Container>
  );
};

export default LogicalOperator;
