/** Return the friendship data of the logged in users*/
Meteor.publish('friendships', function() {
  return Friendships.find({ friendship: { $in: [ this.userId ] } });
});
