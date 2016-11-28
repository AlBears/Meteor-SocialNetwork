Meteor.publish('albums', function () {
  return Albums.find({ owner: this.userId });
})
