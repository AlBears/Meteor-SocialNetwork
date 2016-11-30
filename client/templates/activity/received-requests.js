Template.receivedRequests.helpers({
  /** Check to see if a user received any request */
  'receivedRequests' () {
    return Requests.find({ targetId: Meteor.userId() });
  }
});
  /** Reject request by type of action and requester id */
Template.receivedRequests.events({
  'click button[data-action="rejectRequest"]'() {
    Meteor.call('requests.cancel', 'userHasReceived', this.requesterId);
  },
/** Confirm request create friendship */
  'click button[data-action="confirmFriendship"]' () {
    Meteor.call('requests.confirm', this.requesterId, this.requesterName);
  }
})
