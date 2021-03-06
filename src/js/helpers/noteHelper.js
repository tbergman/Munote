const noteHelper = (type, note, range) => {
  if (type == 'w') {
    return 'U+E1D2';
  }
  if (type == 'wr') {
    return 'U+E4E3';
  }
  if (type == 'h') {
    return 'U+E1D3';
  }
  if (type == 'hr') {
      return 'U+E4E4';
  }
  if (type == 'q') {
    return 'U+E1D5';
  }
  if (type == 'qr') {
    return 'U+E4E5';
  }
  if (type == '8') {
    return 'U+E1D7';
  }
  if (type == '8r') {
    return 'U+E4E6';
  }
  if (type == '16') {
    return 'U+E1D9';
  }
  if (type == '16r') {
    return 'U+E4E7 ';
  }
};

export default noteHelper;
