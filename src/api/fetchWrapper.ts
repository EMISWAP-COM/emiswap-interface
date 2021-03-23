const defaultContentType = 'application/json';
const baseHeaders = {
  'Content-Type': defaultContentType,
};

const handleResponse = (response: Response) => {
  const { status} = response;
  switch (status) {
    case 200:
    case 201:
      return response.json();
    case 404:
    default:
      if ((status >= 400 && status <= 403) || (status >= 405 && status <= 499)) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
  }
};

export const fetchWrapper = {
  get: (endPoint: string, options: RequestInit = {}) => {
    return fetch(endPoint, {
      headers: {
        ...(options.hasOwnProperty('headers')
          ? Object.assign(baseHeaders, options.headers)
          : baseHeaders),
      },
      ...options,
    }).then(res => {
      return handleResponse(res);
    });
  },
  post: (endPoint: string, options: RequestInit = {}) => {
    return fetch(endPoint, {
      headers: {
        ...(options.hasOwnProperty('headers')
          ? Object.assign(baseHeaders, options.headers)
          : baseHeaders),
      },
      method: 'POST',
      ...options,
    }).then(res => {
      return handleResponse(res);
    });
  },
};
