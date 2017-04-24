// action types
export const LOGINED = 'Logined';
export const LOGOUT = 'LOGOUT';
export const GETCOURSES = 'getCourses';
export const EDITCOURSES = 'editcourses';
export const OPENDRAWER = 'opendrawer';
export const CLOSERAWER = 'closeDrawer';
export const SHOW_SNACKBAR = 'show_snackbar';

// action creators
export function login() {
  return {type: LOGINED}
}

export function logout() {
  return {type: LOGOUT}
}

export function getCourses(courses) {
  return {type: GETCOURSES, courses}
}

export function editCourses(course) {
  return {type: EDITCOURSES, course}
}

export function openDrawer() {
  return {type: OPENDRAWER}
}

export function closeDrawer() {
  return {type: CLOSERAWER}
}

export function showSnackbar(message = '') {
  return {type: SHOW_SNACKBAR, message}
}