import React from 'react';

const Particle = ({particle}) => <g>
  <rect
    x={particle.displayX}
    y={particle.displayY}
    width="2"
    height="2" />
</g>;

export default Particle;
