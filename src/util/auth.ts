export async function getToken(): Promise<string> {
  // localhostからは {appName}/.auth/me にアクセスできないため、環境変数にトークンを入れて利用する
  // if (window.location.hostname === 'localhost') return process.env.DEV_TOKEN;
  if (window.location.hostname === 'localhost') return '';

  const response = await fetch('/.auth/me');
  if (!response.ok) return '';
  const data = await response.json();
  return data[0].access_token;
}
