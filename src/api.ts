import got, { GotInstance } from 'got';
import { Included, Job, JobsResponse } from './types';

type TeamtailorOptions = {
  accessToken: string;
  version?: string;
};

export class TeamtailorClient {
  private client: GotInstance<got.GotJSONFn>;

  constructor(options: TeamtailorOptions) {
    this.client = got.extend({
      baseUrl: 'https://api.teamtailor.com/v1',
      headers: {
        Authorization: `Token ${options.accessToken}`,
        'X-Api-Version': options.version ?? '20161108',
        Accept: 'application/vnd.api+json',
      },
      json: true,
    });
  }

  async getJobs(): Promise<[Job[], Included[]]> {
    const includes = ['user', 'colleagues', 'locations', 'role', 'department'];
    const query = new URLSearchParams([['include', includes.join(',')]]);

    try {
      const response = await this.client.get('/jobs', { query });

      const body = response.body as JobsResponse;

      return [body.data, body.included];
    } catch (e) {
      console.error('ERROR');
      console.log(e);
    }

    return [[], []];
  }
}
