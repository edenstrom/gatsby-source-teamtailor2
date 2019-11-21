import createNodeHelpers from 'gatsby-node-helpers';
import {
  Department,
  Job,
  Location,
  Role,
  User,
  withMergedAttributes,
} from './types';

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Teamtailor',
});

const JOB_TYPE = 'Job';
const USER_TYPE = 'User';
const DEPARTMENT_TYPE = 'Department';
const ROLE_TYPE = 'Role';
const LOCATION_TYPE = 'Location';

export const JobNode = createNodeFactory<Job>(JOB_TYPE, node => {
  const merged = withMergedAttributes(node);

  return {
    ...merged,
    user___NODE: generateNodeId(USER_TYPE, merged.relationships.user.data.id),
    department___NODE: generateNodeId(
      DEPARTMENT_TYPE,
      merged.relationships.department.data.id
    ),
    locations___NODE: merged.relationships.locations.data.map(d =>
      generateNodeId(LOCATION_TYPE, d.id)
    ),
  };
});
export const DepartmentNode = createNodeFactory<Department>(
  DEPARTMENT_TYPE,
  node => withMergedAttributes(node)
);
export const UserNode = createNodeFactory<User>(USER_TYPE, node =>
  withMergedAttributes(node)
);
export const LocationNode = createNodeFactory<Location>(LOCATION_TYPE, node =>
  withMergedAttributes(node)
);
export const RoleNode = createNodeFactory<Role>(ROLE_TYPE, node =>
  withMergedAttributes(node)
);
