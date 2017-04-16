// action types
export const LOGINED = 'Logined';
export const LOGOUT = 'LOGOUT';
export const GETCOURSES = 'getCourses';
export const EDITCOURSES = 'editcourses';

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