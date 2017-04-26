// action types
export const LOGINED = 'Logined';
export const LOGOUT = 'LOGOUT';
export const GETCOURSES = 'getCourses';
export const EDITCOURSES = 'editcourses';
export const EDITSECTIONS = 'editsections';
export const GETUSERS = 'getUsers';
export const EDITUSER = 'editUser';
export const GETBLOCKS = 'getBlocks';
export const EDITBLOCK = 'editBlock';
export const GETENTRIES = 'getEntries';
export const EDITENTRY = 'editEntry';
export const OPENDRAWER = 'opendrawer';
export const CLOSERAWER = 'closeDrawer';
export const SHOW_SNACKBAR = 'show_snackbar';

// action creators
export function login(user, role) {
  return {type: LOGINED, user, role}
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

export function editSections(section) {
  return {type: EDITSECTIONS, section}
}

export function getUsers(users) {
  return {type: GETUSERS, users}
}

export function editUser(user) {
  return {type: EDITUSER, user}
}

export function getBlocks(blocks) {
  return {type: GETBLOCKS, blocks}
}

export function editBlock(block) {
  return {type: EDITBLOCK, block}
}

export function getEntries(entries) {
  return {type: GETENTRIES, entries}
}

export function editEntry(entry) {
  return {type: EDITENTRY, entry}
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