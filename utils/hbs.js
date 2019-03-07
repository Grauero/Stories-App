const moment = require('moment');

module.exports = {
  truncate(str, len) {
    if (str.length > len && str.length > 0) {
      let newStr = `${str} `;
      newStr = str.substring(0, len + 1);
      newStr = str.substring(0, newStr.lastIndexOf(' '));
      newStr = newStr.length > 0 ? newStr : str.substring(0, len + 1);

      return `${newStr}...`;
    }

    return str;
  },
  stripTags(str) {
    // removes all html tags from text
    return str.replace(/<(?:.|\n)*?>/gm, '');
  },
  formatDate(date, format) {
    return moment(date).format(format);
  }
};
