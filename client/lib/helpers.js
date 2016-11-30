const moment = require('moment');
/**Better display of dates with hours and minutes */
Template.registerHelper('statusDate', (date) => {
  return date ? moment(date).format('DD MMM YYYY@HH:mm'): '';
});

/**Better display of dates  */
Template.registerHelper('profileDate', (date) => {
  return date ? moment(date).format('DD MMM YYYY') : '';
});
/**
* Check ststus of relationship if a request was sent ot received or
* if friendship already exists
*/
Template.registerHelper('checkRelationshipStatus', (type, id) => {
  switch (type) {
    case 'requestSent':
      return !!Requests.findOne({requesterId: Meteor.userId(), targetId: id});
    case 'requestReceived':
      return !!Requests.findOne({requesterId: id, targetId: Meteor.userId() });
    case 'alreadyFriends':
      return !!Friendships.findOne({ friendship: { $in: [id] } });
    default:
    console.log('Something went wrong');
    break;
  }
});
/** Get the parent template of a child template */
Template.registerHelper('parentData', () => {
  return Template.parentData(2);
});
/**Images -> specific user*/
Template.registerHelper('images', (owner) => {
  return Images.find({ owner });
})
/** Call a recative method to return the username */
Template.registerHelper('findUsernameById', (id) => {
  // return Meteor.call('users.findUsernameById', id, (error, result) => {
  //   console.log(result);
  //   return result;
  // });
  return ReactiveMethod.call('users.findUsernameById', id);
});
