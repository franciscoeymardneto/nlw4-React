import React from 'react';

const ExperienceBar = () => {
  return (
    <header className="experience-bar">
      <span>0 px</span>
      <div>
        <div style={{ width: '50%'}}></div>
        <span className="current-experience" style={{ left: '50%'}}>300xp</span>
      </div>
      <span>670 px</span>
    </header>
  );
}

export default ExperienceBar;