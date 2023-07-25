export function objectToQueryParams(obj: Record<string, string>) {
  if (!obj || Object.keys(obj).length === 0) {
    return '';
  }

  const queryParams = Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `?${queryParams}`;
}
