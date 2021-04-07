import type { paths as Paths } from '../types/swagger-types';
import qs from 'querystring';

const PARAMS_PATTERN = /{(\w+)}/g;

export function compileURL<CurrentPath extends keyof Paths>(
  path: CurrentPath,
  params?: Record<string, string>,
  query?: Record<string, string>,
): string {
  const queryString = query ? '?' + qs.encode(query) : '';
  if (!params) {
    return process.env.REACT_APP_BASE_URL + path + queryString;
  }

  const compiledPath = path.replace(PARAMS_PATTERN, (_, param: string) => params[param]);

  return process.env.REACT_APP_BASE_URL + compiledPath + queryString;
}
