const makePost = (url: string, body: string, options: object) => {
  const headers = options.headers || {};
  return fetch(url, {
    body,
    headers,
    method: 'POST',
  }).then((res) => {
    if (res.statusText === 'No Content') {
      return res;
    }
    return res.json();
  });
};

const makeJSONPost = (url: string, data: any, options: { headers: { } }) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';

  return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
  const options = {
    method: 'POST',
    headers: {
      cookie:
        'did=s%253Av0%253A3928d909-4357-44a4-bea4-f9f89566f63c.hOKSP5XpWyrvSlfBiKHibZytc3ZVNl0gEzDpltl7goQ; did_compat=s%253Av0%253A3928d909-4357-44a4-bea4-f9f89566f63c.hOKSP5XpWyrvSlfBiKHibZytc3ZVNl0gEzDpltl7goQ',
      'Content-Type': 'application/json',
    },
    body: '{"client_id":"wgkb5yWmOClfm8R5Krpt1jz7ZGgoGjLI","client_secret":"3Ghezx3F5CMbRfFjeaU2e1nGbEz1zI-T-nmeuRkL2FnAt7QBiV4Ndemoc5dUPttZ","audience":"https://hotel20242.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
  };

  const res = fetch(
    'https://hotel20242.us.auth0.com/oauth/token',
    options).then((response) => response.json());
  return res;
};

export const createAuth0User = async (
  data: any,
  token: any,
  tokenType: any
) => {
  const url = `https://dev-cmdr8f34n8e8vtvw.us.auth0.com/api/v2/users`;
  const headers = {
    Authorization: `${tokenType} ${token}`,
  };
  const body = data;
  return makeJSONPost(url, body, { headers });
};
export const createUser = (data: any) => {
  const url = `/api/auth0`;
  const body = { data };
  return makeJSONPost(url, body, { headers: {} });
};

export const postEmail = (data: any) => {
  const url = '/api/useremail';
  const headers = '';
  return makeJSONPost(url, data, { headers });
};
