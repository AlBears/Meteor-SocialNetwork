Template.listStatuses.onCreated(function(){
  this.autorun(() => {
    this.subscribe('userStatuses');
    this.subscribe('friendData');
  });
});

Template.listStatuses.helpers({
/* All statuses in descending order*/
  'statuses' () {return Statuses.find({}, { sort : { createdAt: -1} });},
/**Check to see if the logged-in user is the owner of the status*/
  'isOwnerOfStatus'(owner){ return owner === Meteor.userId() ? true : false }
});

Template.listStatuses.events({
/**Call method to remove a status and pass the status id*/
  'click button[data-action="removeStatus"]'(){
    Meteor.call('statuses.remove', this._id );
  }
});
