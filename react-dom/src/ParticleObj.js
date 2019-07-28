import React from 'react';

const ParticleObj = ({particle}) =>
  <div className="particle" style={{
    top: particle.y + 'px',
    left: particle.x + 'px',
  }}>😊</div>;
export default ParticleObj;
