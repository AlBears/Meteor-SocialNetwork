Template.listStatuses.onCreated(function(){
  this.autorun(() => {
    this.subscribe('userStatuses');
    this.subscribe('userComments');
    this.subscribe('friendData');
  });
});

Template.listStatuses.helpers({
/* All statuses in descending order*/
  'statuses' () {return Statuses.find({}, { sort : { createdAt: -1} });},
/**Check to see if the logged-in user is the owner of the status*/
  'isOwnerOfStatus'(owner){ return owner === Meteor.userId() ? true : false },

/**Check to see if the logged-in user has liked a status*/
  'hasLikedStatus'(statusId) {
    let likes = Likes.find({ statusId, owner: Meteor.userId() }).fetch();
    return likes && likes.length ? true : false;
  },
/**Check to see if status has any like*/
  'statusHasLikes' () {
    return !!Likes.findOne({ statusId: this._id });
  },
/**Return how many people have liked the status*/
  'likesData'() {
    let people = Likes.find({ statusId: this._id });
    let howMany = people.count();
    return {
      howMany,
      people,
      notation: howMany > 1 ? 'people like' : 'person likes'
    }
  }
});

Template.listStatuses.events({
/**Call method to remove a status and pass the status id*/
  'click button[data-action="removeStatus"]'(){
    Meteor.call('statuses.remove', this._id );
  },
/**Call method to like a status and send the status id*/
  'click button[data-action="likeStatus"]'(){
    Meteor.call('likes.add', this._id);
  },
/**Call method to dislike a status and send the status id*/
  'click button[data-action="dislikeStatus"]'(){
    Meteor.call('likes.remove', this._id);
  }
});
