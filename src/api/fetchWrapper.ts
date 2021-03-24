const defaultContentType = 'application/json';
const baseHeaders = {
  'Content-Type': defaultContentType,
};

const handleResponse = (response: Response) => {
  const { status, url } = response;
  switch (status) {
    case 200:
    case 201:
      return response.json();
    default:
      if (status === 422) {
        return response.json().then(data => {
          throw new Error(data?.error);
        });
      }
      throw new Error(`something went wrong in ${url}`);
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
