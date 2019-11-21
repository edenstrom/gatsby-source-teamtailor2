export interface JobsResponse {
  data: Job[];
  included: Included[];
  meta: Meta;
  links: JobsLinks;
}

export interface Job {
  // id: string;
  type: 'jobs';
  links: JobLinks;
  attributes: JobAttributes;
  relationships: JobRelationships;
}

export interface JobAttributes {
  'apply-button-text': string;
  body: string;
  'end-date': null;
  'human-status': string;
  internal: boolean;
  picture: Picture | null;
  pinned: boolean;
  'start-date': null;
  status: string;
  tags: any[];
  title: string;
  pitch: null | string;
  'external-application-url': string;
  'name-requirement': string;
  'resume-requirement': string;
  'cover-letter-requirement': string;
  'phone-requirement': string;
  'created-at': null;
  'sharing-image-layout': string;
  mailbox: string;
}

export interface Picture {
  original?: string;
  standard?: string;
  thumb?: string;
}

export interface JobLinks {
  'careersite-job-url': string;
  'careersite-job-apply-url': string;
  'careersite-job-apply-iframe-url': string;
  self: string;
}

export interface JobRelationships {
  department: Relationship;
  role: Relationship<null>;
  location: Relationship<undefined>;
  locations: Relationship<RelationshipData[]>;
  user: Relationship;
  questions: Relationship<undefined>;
  candidates: Relationship<undefined>;
  stages: Relationship<undefined>;
  colleagues: Relationship<RelationshipData[]>;
  'team-memberships': Relationship<undefined>;
  'picked-questions': Relationship<undefined>;
}

export interface Relationship<T = RelationshipData> {
  links: RelationshipLinks;
  data: T;
}

export interface RelationshipLinks {
  self: string;
  related: string;
}

export interface RelationshipData {
  type: DataType;
  id: string;
}

export type DataType = 'departments' | 'locations' | 'roles' | 'users';

export type Included = Department | Location | User | Role;

export interface Department {
  id: string;
  type: 'departments';
  links: IncludedLinks;
  relationships: {
    roles: Relationship;
    'team-memberships': Relationship;
  };
  attributes: {
    name: string;
    'people-headline': string;
    'people-text': string;
    'row-order': number;
    pictures: Picture[];
    headline: string;
    text: string;
  };
}

export interface Location {
  id: string;
  type: 'locations';
  links: IncludedLinks;
  attributes: {
    address: string;
    city: string;
    country: string;
    email: string;
    headquarters: boolean;
    lat: string;
    long: string;
    phone: string | null;
    zip: string;
  };
}

export interface User {
  id: string;
  type: 'users';
  links: IncludedLinks;
  relationships: {
    department: Relationship;
    location: Relationship;
    jobs: Relationship;
  };
  attributes: {
    description: null | string;
    'facebook-profile': null | string;
    'hide-email': boolean;
    'instagram-profile': null | string;
    'linkedin-profile': null | string;
    'other-profile': null | string;
    picture: Picture;
    role: string;
    title: string;
    name: string;
    email: string;
    'twitter-profile': null | string;
    username: null | string;
    visible: boolean;
    signature: string;
  };
}

export interface Role {
  id: string;
  type: 'roles';
  links: IncludedLinks;
  relationships: {
    department: Relationship;
  };
  attributes: {
    name: string;
  };
}

export interface IncludedLinks {
  self: string;
}

export interface JobsLinks {
  first: string;
  last: string;
}

export interface Meta {
  'record-count': number;
  'page-count': number;
}

export type MergeAttributes<
  T extends { attributes: unknown },
  TAttributes = T['attributes']
> = TAttributes & Omit<T, 'attributes'>;

export const withMergedAttributes = <T extends { attributes: object }>(
  node: T
): MergeAttributes<T> => {
  const { attributes, ...rest } = node;

  return {
    ...attributes,
    ...rest,
  };
};