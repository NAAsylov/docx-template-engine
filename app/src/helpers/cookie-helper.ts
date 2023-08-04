import {IUser} from "../models/IUser";

/**
 * @param  {string} key Куки, который ищем
 * @returns string
 */
export function getCookie(key: string): string {
  const all_cookies = document.cookie.split(';');
  for (const cookie of all_cookies) {
    const kv_pair = cookie.split('=');
    if (kv_pair[0].trim() === key) {
      return decodeURIComponent(kv_pair[1]);
    }
  }
  return '';
}

/** Очищаем куки */
export function deleteCookie(key: string) {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

interface ICookieOptions {
  maxAge?: number;
  expires?: string | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export interface IJWT {
  /** Время истечения токена */
  exp: number;
  /** Время создания токена */
  iat: number;
  /** Текущий пользователь */
  user: IUser;
}

/**
 * Возращает payload jwt
 * @returns object
 */
export function parseJWT(access_token: string): IJWT | null {
  if (access_token) {
    try {
      const base64 = access_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Sets a value for given cookie key
 * @param key ID for the value
 * @param value Raw value to be stored
 * @param [options] maxAge / expires / path / domain / secure
 * @returns string
 */
export function putCookie(key: string, value: string, options?: ICookieOptions): string {
  let cookie_string = `${key}=${value};`;

  if (options) {
    if (options.maxAge) {
      cookie_string += ` maxAge=${options.maxAge};`;
    } else if (options.expires instanceof Date) {
      cookie_string += ` expires=${options.expires.toUTCString()};`;
    } else if (!options.expires) {
      cookie_string += ` expires=${options.expires};`;
    }
    if (options.path) {
      cookie_string += ` path=${options.path};`;
    }
    // if (options.domain && !(location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    //   cookie_string += ` domain=${options.domain};`;
    // }
    if (options.secure) {
      cookie_string += ' ;secure';
    }
  }

  document.cookie = cookie_string;
  return document.cookie;
}

/**
 * Удаление JWT cookie
 */
export function removeJWT() {
  console.log('removeJWT')
  document.cookie = 'access_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'access_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=';
  document.cookie = 'refresh_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `refresh_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=`;
}

const cookie_life_duration = 1000 * 60 * 60 * 24;
const refresh_token_cookie_duration = 1000 * 60 * 60 * 24 * 7;

export function setJWT(access_token: string, refresh_token: string) {
  const jwt_data = parseJWT(access_token);
  const date_now = Date.now();
  const jwt_duration = jwt_data ? jwt_data.exp * 1000 : date_now + cookie_life_duration;

  putCookie('access_token', access_token, {
    path: '/',
    expires: new Date(jwt_duration),
    domain: '',
  });
  putCookie('refresh_token', refresh_token, {
    path: '/',
    expires: new Date(date_now + refresh_token_cookie_duration),
    domain: '',
  });
}
