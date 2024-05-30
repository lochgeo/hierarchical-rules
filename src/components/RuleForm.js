// src/components/RuleForm.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-left: 5px;
  font-size: 14px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const RuleForm = ({ rule, onSave, onCancel }) => {
  const [name, setName] = useState(rule ? rule.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRule = {
      ...rule,
      name,
    };
    onSave(updatedRule);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
        <Button type="submit">Save</Button>
      </ButtonGroup>
    </Form>
  );
};

export default RuleForm;
