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
  'click button[data-action="requestFriendship"]'() {

    /**Call a method to add a new request and send
     * the id and full name of the target user
     */
    Meteor.call('requests.add', this.__originalId, this.profile.fullName);
    console.log(this.__originalId, this.profile.fullName);
  }
});
