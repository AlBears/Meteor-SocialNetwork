Meteor.methods({
  'profile.update' (updates) {
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(updates, Object);

    //Check if username is available
    if (Meteor.users.findOne({ username: updates.username })){
      throw new Meteor.Error(403, `${updates.username} is already taken`);
    }

    Meteor.users.update({ _id: this.userId }, {
      $set: {
        "profile.firstName": updates.firstName,
        "profile.lastName": updates.lastName,
        "profile.birthday": updates.birthday,
        "profile.location": updates.location,
        "profile.meta.isPublicProfile": updates.isPublicProfile,
        "username": updates.username
      }
    });

    if (!_.isEmpty(updates.firstName) && !_.isEmpty(updates.lastName)){
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          "profile.fullName": `${updates.firstName} ${updates.lastName}`
        }
      })
    }
  }
})
