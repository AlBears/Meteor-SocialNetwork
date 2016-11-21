Template.findUsers.onCreated(function () {
  this.autorun(() => {
    this.subscribe('requests');
  });
});

Template.findUsers.helpers({
  /** Return the search index */
  'usersIndex' () { return UsersIndex; },
  /** Add css classes to the search input field */
  'inputAttributes' () { return {'class': 'form-control from-group'}; }

});

Template.findUsers.events({
  /**Call a method to add a new request and send
   * the id and full name of the target user
   */

  'click button[data-action="requestFriendship"]'() {
    Meteor.call('requests.add', this.__originalId, this.profile.fullName);
  },
  /**
  * Call method to remove a request sent by the logged in user
  * and pass the id of the TARGET user
  */

  'click button[data-action="cancelFriendRequest"]' () {
    Meteor.call('requests.cancel', 'userHasSent', this.__originalId);
  },
  /**
  * Call method to remove a request sent by the logged in user
  * and pass the id of the REQUESTING user
  */
  'click button[data-action="rejectRequest"]' () {
    Meteor.call('requests.cancel', 'userHasReceived', this.__originalId);
  }
});
