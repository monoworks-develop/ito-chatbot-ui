export async function getToken() {
  // localhostからは {appName}/.auth/me にアクセスできないため、環境変数にトークンを入れて利用する
  if (window.location.hostname === 'localhost') return process.env.DEV_TOKEN;

  const response = await fetch('/.auth/me');
  if (!response.ok) return '';
  const data = await response.json();
  console.log(data);

  return '';
}
