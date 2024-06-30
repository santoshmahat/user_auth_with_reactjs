const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const endpoint = {
  login: (url: string) => `${baseUrl}/${url}`,
  register: (url: string) => `${baseUrl}/${url}`,
}