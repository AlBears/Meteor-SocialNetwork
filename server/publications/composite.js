/**
* Return statuses made by friends of the logged-in user
*/
Meteor.publishComposite('friendData', {
  find: function(){
    return Friendships.find({ friendship: { $in: [this.userId] } });
  },

  children: [
    {
      find: function(friendship){
        return Statuses.find({ owner: { $in: friendship.friendship } });
      },
      children: [
        {
          find: function(status, friendship){
            return Likes.find({ $or: [
              { owner: { $in: friendship.friendship }},
              { statusId: status._id }
            ]  });
          }
        }
      ]
    }
  ]
});
