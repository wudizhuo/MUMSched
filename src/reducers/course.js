import {GETCOURSES, EDITCOURSES} from "../actions";

function course(state = [], action) {
  switch (action.type) {
    case GETCOURSES :
      return Object.assign({}, state, {
        courses: action.courses,
      });
    case EDITCOURSES :
      return Object.assign({}, state, {
        edit_course: action.course,
      });
    default:
      return state;
  }
}

export default course;
