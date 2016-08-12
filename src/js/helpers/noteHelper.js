const noteHelper = (type, rest, pitch) => {
  if (type == 'whole') {
    if (rest) {
      return 'U+E4E3';
    } else if (pitch) {
      return 'U+E1D2';
    }
  } else if (type == 'half') {
    if (rest) {
      return 'U+E4E4';
    } else if (pitch) {
      return 'U+E1D3';
    }
  } else if (type == 'quarter') {
    if (rest) {
      return 'U+E4E5';
    } else if (pitch) {
      return 'U+E1D5';
    }
  } else if (type == 'eighth') {
    if (rest) {
      return 'U+E4E6';
    } else if (pitch) {
      return 'U+E1D7';
    }
  } else if (type == '16th') {
    if (rest) {
      return 'U+E4E7';
    } else if (pitch) {
      return 'U+E1D9';
    }
  }
};

export default noteHelper;
