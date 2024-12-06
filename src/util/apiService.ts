import { AskBody } from '@/types/azureOpenai.types';

import { getToken } from './auth';
import { getEnv } from './getEnv';

// APIに対してトークンを付与してfetchを行う
export function fetchApi(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: string,
) {
  const token = getToken();
  const apiBaseUrl = getEnv('API_BASE_URL');

  return fetch(`${apiBaseUrl}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });
}

// APIに対してAskリクエストを送信する
export async function ask(body: AskBody) {
  return fetchApi('azure_openai/ask', 'POST', JSON.stringify(body));
}
