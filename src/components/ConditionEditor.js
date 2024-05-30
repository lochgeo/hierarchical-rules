// src/components/ConditionEditor.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f0f0f0;
  margin-bottom: 10px;
`;

const Select = styled.select`
  margin-right: 10px;
  padding: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ConditionEditor = ({ condition, onSave, onCancel }) => {
  const [field, setField] = useState(condition?.field || '');
  const [operator, setOperator] = useState(condition?.operator || '==');
  const [value, setValue] = useState(condition?.value || '');

  const handleSave = () => {
    onSave({ field, operator, value });
  };

  return (
    <Container>
      <Select value={field} onChange={(e) => setField(e.target.value)}>
        <option value="">Select Field</option>
        <option value="field1">Field 1</option>
        <option value="field2">Field 2</option>
      </Select>
      <Select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="==">==</option>
        <option value="!=">!=</option>
        <option value=">">{">"}</option>
        <option value="<">{"<"}</option>
        <option value=">=">{">="}</option>
        <option value="<=">{"<="}</option>
      </Select>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
      />
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={onCancel} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancel</Button>
    </Container>
  );
};

export default ConditionEditor;
