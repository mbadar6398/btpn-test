export const baseUrl: string =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost/dpbca/api/'
    : 'http://localhost/dpbca/api/';
