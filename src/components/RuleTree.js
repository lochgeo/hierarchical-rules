// src/components/RuleTree.js
import React from 'react';
import RuleNode from './RuleNode';

const RuleTree = ({ rule, onAdd, onUpdate, onDelete, availableConditions }) => {
  return (
    <div>
      <RuleNode
        rule={rule}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        availableConditions={availableConditions}
      />
      {rule.children && rule.children.length > 0 && (
        <div>
          {rule.children.map(child => (
            <RuleTree
              key={child.id}
              rule={child}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onDelete={onDelete}
              availableConditions={availableConditions}
            />
          ))}
          <button onClick={() => onAdd(rule.id)}>Add Rule</button>
        </div>
      )}
    </div>
  );
};

export default RuleTree;
