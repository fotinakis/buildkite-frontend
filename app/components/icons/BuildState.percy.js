import { BuildState } from './BuildState';

percySnapshot('BuildState', { widths: [320] }, () => {
  const CustomBuildState = BuildState['SCHEDULED'];
  return <CustomBuildState state='SCHEDULED' className="some-weird-class-name" />;
});
