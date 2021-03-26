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
    case 422:
      console.log('response', response);
      return response.json().then(data => {
        console.log('data', data, new CustomError(data?.error, data?.payload));
        throw new CustomError(data?.error, data?.payload);
      });
    default:
      throw new Error(`something went wrong while requesting ${url}`);
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

class CustomError extends Error {
  payload: any;
  constructor(message: string, errorObj?: any) {
    super(message);
    this.payload = errorObj;
  }
}
