const moment = require('moment');
/**Better display of dates with hours and minutes */
Template.registerHelper('statusDate', (date) => {
  return date ? moment(date).format('DD MMM YYYY@HH:mm'): '';
});
