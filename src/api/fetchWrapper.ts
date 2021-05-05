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
    case 477:
      console.log('response 477', response);
      return response.json().then(data => {
        console.log('data err', data, new CustomError(data?.error_message, data?.payload));
        throw new CustomError(data?.error_message, data?.payload);
      });
    case 422:
      console.log('response 422', response);
      return response.json().then(data => {
        console.log('data err', data, new CustomError(data?.error, data?.payload));
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
  put: (endPoint: string, options: RequestInit = {}) => {
    return fetch(endPoint, {
      headers: {
        ...(options.hasOwnProperty('headers')
          ? Object.assign(baseHeaders, options.headers)
          : baseHeaders),
      },
      method: 'PUT',
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
