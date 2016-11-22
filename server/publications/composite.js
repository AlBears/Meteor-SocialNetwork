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
      }
    }
  ]
});
