// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import RuleTree from './components/RuleTree';
import DraggableCondition from './components/DraggableCondition';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Root Rule',
      conditions: [],
      children: [],
    },
  ]);

  const [availableConditions, setAvailableConditions] = useState([
    'Condition A',
    'Condition B',
    'Condition C',
  ]);

  const handleAddRule = (parentId) => {
    const newRule = {
      id: rules.length + 1,
      name: `New Rule ${rules.length + 1}`,
      conditions: [],
      children: [],
    };

    const addRuleToParent = (rules, parentId) => {
      return rules.map(rule => {
        if (rule.id === parentId) {
          return {
            ...rule,
            children: [...rule.children, newRule],
          };
        }
        if (rule.children) {
          return {
            ...rule,
            children: addRuleToParent(rule.children, parentId),
          };
        }
        return rule;
      });
    };

    setRules(addRuleToParent(rules, parentId));
  };

  const handleUpdateRule = (updatedRule) => {
    const updateRuleInList = (rules, updatedRule) => {
      return rules.map(rule => {
        if (rule.id === updatedRule.id) {
          return updatedRule;
        }
        if (rule.children) {
          return {
            ...rule,
            children: updateRuleInList(rule.children, updatedRule),
          };
        }
        return rule;
      });
    };

    setRules(updateRuleInList(rules, updatedRule));
  };

  const handleDeleteRule = (ruleId) => {
    const deleteRuleFromList = (rules, ruleId) => {
      return rules.filter(rule => rule.id !== ruleId).map(rule => {
        if (rule.children) {
          return {
            ...rule,
            children: deleteRuleFromList(rule.children, ruleId),
          };
        }
        return rule;
      });
    };

    setRules(deleteRuleFromList(rules, ruleId));
  };

  return (
    <Container className="app">
      <h1>Rules Hierarchy</h1>
      {rules.map(rule => (
        <RuleTree
          key={rule.id}
          rule={rule}
          onAdd={handleAddRule}
          onUpdate={handleUpdateRule}
          onDelete={handleDeleteRule}
          availableConditions={availableConditions}
        />
      ))}
    </Container>
  );
};

export default App;

