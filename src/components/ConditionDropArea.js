// src/components/ConditionDropArea.js
import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const DropArea = styled.div`
  padding: 15px;
  margin: 10px 0;
  background-color: #f0f8ff;
  border: 2px dashed #007bff;
  border-radius: 5px;
  text-align: center;
  color: #007bff;
  font-style: italic;
`;

const ConditionDropArea = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: 'condition',
    drop: (item) => {
      onDrop(item.condition);
    },
  });

  return (
    <DropArea ref={drop}>
      Drop conditions here
    </DropArea>
  );
};

export default ConditionDropArea;
