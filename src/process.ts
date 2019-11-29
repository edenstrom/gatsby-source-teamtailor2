import createNodeHelpers from 'gatsby-node-helpers';
import { convertHtmlToAst, convertHtmlToMarkdown } from './convertHtml';
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
  const { user, department, locations } = merged.relationships;

  return {
    ...merged,
    bodyMarkdown: convertHtmlToMarkdown(merged.body),
    bodyAst: convertHtmlToAst(merged.body),
    user___NODE: user.data
      ? generateNodeId(USER_TYPE, user.data.id ?? '')
      : null,
    department___NODE: department.data
      ? generateNodeId(DEPARTMENT_TYPE, department.data.id)
      : null,
    locations___NODE:
      locations.data?.map(d => generateNodeId(LOCATION_TYPE, d.id)) ?? [],
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
