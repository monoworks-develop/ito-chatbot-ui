// クライアントサイドでも環境変数を取得できるようにする関数
// Azure上の環境変数はNEXT_PUBLIC_をつけていたとしてもクライアントサイドから参照できないため
// クライアントサイドから呼ばれた場合は、サーバーサイドにNEXT_PUBLIC_のついた環境変数名の値を取得しにいく
export async function getEnv(name: string) {
  const isServer = typeof window === 'undefined';

  if (isServer) return process.env[name];
  else {
    const response = await fetch(`/env?name=NEXT_PUBLIC_${name}`);
    if (!response.ok) return '';
    return await response.text();
  }
}
