import { CreateSchemaCustomizationArgs, SourceNodesArgs } from 'gatsby';
import { TeamtailorClient } from './api';
import {
  DepartmentNode,
  JobNode,
  LocationNode,
  RoleNode,
  UserNode,
} from './process';

export type TeamtailorPluginOptions = {
  accessToken: string;
};

exports.sourceNodes = async (
  { actions }: SourceNodesArgs,
  options: TeamtailorPluginOptions
) => {
  const token = options.accessToken || null;

  if (token == null) {
    throw new Error('Invalid access token for gatsby-source-teamtailor2');
  }

  const { createNode } = actions;

  const client = new TeamtailorClient({
    accessToken: token,
  });

  const [jobs, included] = await client.getJobs();

  if (!jobs) throw new Error('Failed to fetch jobs from Teamtailor');

  included.forEach((include) => {
    switch (include.type) {
      case 'departments':
        return createNode(DepartmentNode(include));
      case 'users':
        return createNode(UserNode(include));
      case 'locations':
        return createNode(LocationNode(include));
      case 'roles':
        return createNode(RoleNode(include));
    }
  });

  jobs.forEach((job) => {
    const node = JobNode(job);
    createNode(node);
  });

  return;
};

exports.createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  const typeDefs = `
    type TeamtailorJob implements Node {
      id: ID!
      bodyAst: JSON!
      title: String
      locations: [TeamtailorLocation!]!
      links: TeamtailorJobLink!
      user: TeamtailorUser
      department: TeamtailorDepartment
    }

    type TeamtailorLocation implements Node {
      id: ID!
      city: String
    }

    type TeamtailorDepartment implements Node {
      id: ID!
      name: String
    }

    type TeamtailorUser implements Node {
      id: ID!
      title: String!
      name: String!
      email: String!
      hide_email: Boolean!
      picture: TeamtailorUserPicture
    }

    type TeamtailorUserPicture {
      standard: String
    }

    type TeamtailorJobLink {
      careersite_job_url: String
      careersite_job_apply_url: String
    }
  `;

  createTypes(typeDefs);
};
