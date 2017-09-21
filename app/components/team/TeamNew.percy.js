import { TeamNew } from './TeamNew';

percySnapshot('TeamNew', () => {
  return (
    <TeamNew
      organization={{
        id: 'id',
        name: 'Organization Name',
        slug: 'organization-name'
      }}
    />
  );
});
