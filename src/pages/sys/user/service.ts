import request from '@/utils/request';
import { UserParams } from './data.d';

export async function queryUser(params: UserParams) {
  return request('/api/sys/user', {
    params,
  });
}
