export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export const TOKEN_STORAGE_KEY = 'rpgwiki_access_token';
