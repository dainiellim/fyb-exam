const COOKIE_NAME = 'authToken';

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
  
  if (cookie) {
    return cookie.split('=')[1];
  }
  
  return null;
};

export const setCookie = (name: string, value: string, options: {
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
} = {}): void => {
  const {
    expires,
    path = '/',
    domain,
    secure = true,
    sameSite = 'Strict'
  } = options;

  let cookieString = `${name}=${value}`;

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }

  document.cookie = cookieString;
};

export const deleteCookie = (name: string, path: string = '/'): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; secure; samesite=Strict`;
};

export const hasAuthCookie = (): boolean => {
  return getCookie(COOKIE_NAME) !== null;
};

export const getAuthToken = (): string | null => {
  return getCookie(COOKIE_NAME);
};

export const clearAuthCookie = (): void => {
  deleteCookie(COOKIE_NAME);
}; 