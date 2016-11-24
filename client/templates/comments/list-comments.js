Template.listComments.helpers({
  /**Get all comments associated with a status in descending order*/
  'comments'(statusId){
    return Comments.find({statusId}, {sort:{createdAt: -1 } });
  },

  'isOwnerOfCommentOrStatus'(statusOwner) {
    return this.owner === Meteor.userId() || statusOwner === Meteor.userId() ? true : false;
  }
});
