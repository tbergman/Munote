export default function file(state = {}, action) {
  switch(action.type) {
    case 'IMPORT_FILE': {
      console.log(action.payload);
      return action.payload['score-partwise'];
    }
    default: {
      return state;
    }
  }
}
