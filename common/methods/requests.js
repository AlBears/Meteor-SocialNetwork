Meteor.methods({
  /**
  * Method to add new request. Receives the id and full name of target user
  */
  'requests.add'(targetId, targetName){
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(targetId, String);
    check(targetName, String );
    Requests.insert({ targetId, targetName });
  },
  /**
  * Cancel a request. Receives the type of request and id
  */

  'requests.cancel'(type, id){
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(type, String);
    check(id, String );

    switch (type){
      case 'userHasSent':
        Requests.remove({ requesterId: this.userId, targetId: id });
        break;
      case 'userHasReceived':
        Requests.remove({ requesterId: id, targetId: this.userId });
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }
});
