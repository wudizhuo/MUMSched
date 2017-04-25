import {GETSECTIONS, EDITSECTIONS} from "../actions";

function section(state = [], action) {
  switch (action.type) {
    case GETSECTIONS :
      return Object.assign({}, state, {
        sections: action.sections,
      });
    case EDITSECTIONS :
      return Object.assign({}, state, {
        edit_section: action.section,
      });
    default:
      return state;
  }
}

export default section;
