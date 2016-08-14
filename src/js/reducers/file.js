export default function file(state = {}, action) {
  switch(action.type) {
    case 'IMPORT_JSON': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
