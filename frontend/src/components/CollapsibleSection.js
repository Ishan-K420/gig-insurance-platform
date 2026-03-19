import React, { useState } from 'react';

function CollapsibleSection({ icon, title, description, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="section-toggle">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-header-left">
          <div className="section-icon">{icon}</div>
          <div className="section-info">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className={`section-arrow ${isOpen ? 'open' : ''}`}>▼</div>
      </div>
      <div className={`section-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default CollapsibleSection;
