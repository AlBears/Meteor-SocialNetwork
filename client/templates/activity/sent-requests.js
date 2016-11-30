Template.sentRequests.helpers({
  /** Check to see if a user has sent requests */
  'sentRequests' () {
    return Requests.find({ requesterId: Meteor.userId() });
  }
});
/** Call method to cancel request passing type of action */
Template.sentRequests.events({
  'click button[data-action="cancelFriendRequest"]' () {
    Meteor.call('requests.cancel', 'userHasSent', this.targetId );
  }
});
