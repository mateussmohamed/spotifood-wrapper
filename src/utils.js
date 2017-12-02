export const toJSON = data => data.json();

export const parseURL = (baseURL, params) => {
  const url = new URL(baseURL); //eslint-disable-line
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.href;
};
