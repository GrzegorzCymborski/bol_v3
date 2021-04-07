// https://github.com/olafsulich/DevFeedback/blob/develop/packages/www/utils/fetcher.ts
import { ResponseError } from './responseError';
import { compileURL } from './compileURL';
import { getJSON } from './getJSON';

import type { paths as Paths } from '../../types/swagger-types';

type MethodType<CurrentPath extends keyof Paths> = keyof Paths[CurrentPath];

type ParamsType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { path: infer Params };
}
  ? Params
  : Record<string, unknown>;

type HeadersType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { header: infer Headers };
}
  ? Headers
  : Record<string, unknown>;

type QueryType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { query: infer Query };
}
  ? Query
  : Record<string, unknown>;

type BodyType<
  CurrentPath extends keyof Paths,
  CurrentMethod extends MethodType<CurrentPath>
> = Paths[CurrentPath][CurrentMethod] extends {
  parameters: { body: infer Body };
}
  ? Body
  : null;

type HttpOkayCodes = '200' | '201';

export async function fetcher<CurrentPath extends keyof Paths, Method extends MethodType<CurrentPath>>(
  path: CurrentPath,
  method: Method,
  headers: HeadersType<CurrentPath, Method>,
  params?: ParamsType<CurrentPath, Method>,
  query?: QueryType<CurrentPath, Method>,
  body?: BodyType<CurrentPath, Method>,
): Promise<
  Paths[CurrentPath][Method] extends {
    responses: { [K in HttpOkayCodes]?: { schema: infer Response } };
  }
    ? Response & { statusCode: number }
    : undefined
> {
  const url = compileURL(path, params as Record<string, string>, query as Record<string, string>);
  const methodString = method as string;
  const response = await fetch(url, {
    method: method && methodString.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    },
    credentials: 'include',
    ...(body && { body: JSON.stringify((body as any).body) }),
  });

  const data = (await getJSON(response)) as any;

  if (response.ok || data.statusCode === 404) {
    return { ...data, statusCode: response.status };
  }

  throw new ResponseError(response.statusText, response.status, data);
}
