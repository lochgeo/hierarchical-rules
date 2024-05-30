// src/components/DraggableCondition.js
import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const Draggable = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: #e0f7fa;
  border: 1px solid #4dd0e1;
  border-radius: 5px;
  cursor: grab;
  user-select: none;
  &:hover {
    background-color: #b2ebf2;
  }
`;

const DraggableCondition = ({ condition }) => {
  const [, drag] = useDrag({
    type: 'condition',
    item: { condition },
  });

  return (
    <Draggable ref={drag}>
      {condition}
    </Draggable>
  );
};

export default DraggableCondition;
