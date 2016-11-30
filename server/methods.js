Meteor.methods({
  /** Find a user by specified id and return only username*/
  'users.findUsernameById' (id) {
    return Meteor.users.findOne({ _id:id }).username;
  }
});
