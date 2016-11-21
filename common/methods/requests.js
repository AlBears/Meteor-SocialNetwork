Meteor.methods({
  'requests.add'(targetId, targetName){
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(targetId, String);
    check(targetName, String );
    Requests.insert({ targetId, targetName });
  }
});
