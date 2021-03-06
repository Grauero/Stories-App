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
  },
  select(selected, options) {
    return options
      .fn(this)
      .replace(new RegExp(` value="${selected}"`), '$&selected="selected"')
      .replace(new RegExp(`>${selected}</option>`), 'selected="selected"$&');
  },
  editIcon(storyUser, loggedUser, storyId, floating = true) {
    if (storyUser === loggedUser) {
      if (floating) {
        return `
          <a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red" aria-label="edit">
            <i class="fa fa-pencil"></i>
          </a>
        `;
      }

      return `
          <a href="/stories/edit/${storyId}" aria-label="edit">
            <i class="fa fa-pencil"></i>
          </a>
        `;
    }

    return '';
  }
};
