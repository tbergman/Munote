const noteHelper = (type) => {
  if (type == 'whole') {
    return 'W';
  } else if (type == 'half') {
    return 'H';
  } else if (type == 'quarter') {
    return 'Q';
  } else if (type == 'eighth') {
    return '8th';
  } else if (type == '16th') {
    return '16';
  }
};

export default noteHelper;
