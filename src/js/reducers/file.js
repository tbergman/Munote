export default function file(state = {}, action) {
  switch(action.type) {
    case 'IMPORT_FILE': {
      return action.payload['score-partwise'];
    }
    default: {
      return state;
    }
  }
}
