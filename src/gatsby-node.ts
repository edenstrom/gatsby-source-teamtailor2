import { SourceNodesArgs } from 'gatsby';
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

  included.forEach(include => {
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

  jobs.forEach(job => {
    const node = JobNode(job);
    createNode(node);
  });

  return;
};
