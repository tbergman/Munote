var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

export const importFile = (path) => (dispatch) => {
  fs.readFile(path, (err, data) => {
    if (err) { console.log(err); }
    if (path.slice(-3) === 'xml') {
      parser.parseString(data, (err, result) => {
        dispatch(sendJson(result));
      });
    } else if (path.slice(-4) === 'json') {
      dispatch(sendJson(data));
    }
  });
};

const sendJson = (json) => ({
  type: 'IMPORT_FILE',
  payload: json
});
