var fs = require('fs');

export const importFile = (path) => (dispatch) => {
  const file = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (path.slice(-3) === 'xml') {
    console.log('Implement XML to JSON later using customized Parser.');
  } else if (path.slice(-4) === 'json') {
    dispatch({
      type: 'IMPORT_JSON',
      payload: file
    });
  }
};
