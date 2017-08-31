import BuildState from './BuildState';
import React from 'react';

percySnapshot('BuildState', { widths: [320, 768, 1280] }, () => {
  const BuildStateComponent = BuildState['SCHEDULED'];

  return <BuildStateComponent state='SCHEDULED' className="some-weird-class-name" />;
});

