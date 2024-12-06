export function getToken() {
  const token = '';
  return token;
}

export function getAuthHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}
