// action types
export const LOGINED = 'Logined';
export const LOGOUT = 'LOGOUT';


// action creators
export function login() {
  return {type: LOGINED}
}

export function logout() {
  return {type: LOGOUT}
}