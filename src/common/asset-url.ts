const publicBaseUrl =
  process.env.PUBLIC_BASE_URL ??
  process.env.API_BASE_URL ??
  'https://api.uhhe.ru';

export function toPublicAssetUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;

  const base = publicBaseUrl.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;

  return `${base}${encodeURI(path)}`;
}
