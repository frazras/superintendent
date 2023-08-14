import React, { useState } from 'react';

function CollapsibleField({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <fieldset>
      <legend onClick={toggleOpen} style={{ cursor: 'pointer' }}>{title}</legend>
      {isOpen && <div>{children}</div>}
    </fieldset>
  );
}

export default CollapsibleField;
