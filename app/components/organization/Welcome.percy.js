import Welcome from './Welcome';
import React from 'react';

percySnapshot('Welcome', { widths: [320, 768, 1280] }, () => {
  return <Welcome />;
});
