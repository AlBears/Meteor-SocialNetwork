Meteor.publish('userComments', function() {
  return Comments.find({owner: this.userId});
})
