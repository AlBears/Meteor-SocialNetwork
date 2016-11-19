Meteor.methods({
  'statuses.add' (status){
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(status, String);
    Statuses.insert({status});
    
  }
})
