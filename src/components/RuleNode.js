// src/components/RuleNode.js
import React, { useState } from 'react';
import styled from 'styled-components';
import RuleForm from './RuleForm';
import ConditionDropArea from './ConditionDropArea';
import ConditionEditor from './ConditionEditor';
import LogicalOperator from './LogicalOperator';

const NodeContainer = styled.div`
  margin-left: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const RuleName = styled.span`
  font-weight: bold;
`;

const ConditionsList = styled.div`
  margin-top: 10px;
`;

const ConditionItem = styled.div`
  padding: 5px;
  background-color: #e9f7f9;
  border: 1px solid #d1eef0;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const RuleNode = ({ rule, onAdd, onUpdate, onDelete, availableConditions }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingConditionIndex, setEditingConditionIndex] = useState(null);
  const [conditions, setConditions] = useState(rule.conditions || []);
  const [logicalOperator, setLogicalOperator] = useState('AND');

  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleDropCondition = (condition) => {
    setConditions([...conditions, condition]);
  };

  const handleSaveCondition = (index, condition) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = condition;
    setConditions(updatedConditions);
    setEditingConditionIndex(null);
  };

  const handleDeleteCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    <NodeContainer>
      <Header>
        <div>
          <HeaderButton onClick={handleExpandCollapse}>
            {expanded ? '-' : '+'}
          </HeaderButton>
          <RuleName>{rule.name}</RuleName>
        </div>
        <div>
          <HeaderButton onClick={() => setEditing(true)}>Edit</HeaderButton>
          <HeaderButton onClick={() => onDelete(rule.id)}>Delete</HeaderButton>
        </div>
      </Header>
      {editing && (
        <RuleForm
          rule={rule}
          onSave={(updatedRule) => {
            onUpdate({ ...updatedRule, conditions });
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      )}
      <ConditionDropArea onDrop={handleDropCondition} availableConditions={availableConditions} />
      <LogicalOperator operator={logicalOperator} onChange={setLogicalOperator} />
      <ConditionsList>
        {conditions.map((condition, index) => (
          <ConditionItem key={index}>
            {editingConditionIndex === index ? (
              <ConditionEditor
                condition={condition}
                onSave={(updatedCondition) => handleSaveCondition(index, updatedCondition)}
                onCancel={() => setEditingConditionIndex(null)}
              />
            ) : (
              <>
                <span>{`${condition.field} ${condition.operator} ${condition.value}`}</span>
                <div>
                  <HeaderButton onClick={() => setEditingConditionIndex(index)}>Edit</HeaderButton>
                  <HeaderButton onClick={() => handleDeleteCondition(index)}>Delete</HeaderButton>
                </div>
              </>
            )}
          </ConditionItem>
        ))}
      </ConditionsList>
      {expanded && rule.children && (
        <div>
          {rule.children.map(child => (
            <RuleNode
              key={child.id}
              rule={child}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onDelete={onDelete}
              availableConditions={availableConditions}
            />
          ))}
          <HeaderButton onClick={() => onAdd(rule.id)}>Add Rule</HeaderButton>
        </div>
      )}
    </NodeContainer>
  );
};

export default RuleNode;
