export async function getEnv(name: string) {
  const isServer = typeof window === 'undefined';
  let value;

  if (isServer) value = process.env[name];
  else {
    const response = await fetch(`/env?name=NEXT_PUBLIC_${name}`);
    if (!response.ok) value = '';
    value = await response.text();
  }

  return value;
}
