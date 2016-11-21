Meteor.methods({
  /**
  * Method to add new request. Receives the id and full name of target user
  */
  'requests.add'(targetId, targetName){
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(targetId, String);
    check(targetName, String );
    Requests.insert({ targetId, targetName });
  }
});
