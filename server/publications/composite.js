/**
* Return statuses made by friends of the logged-in user
* Return the likes associated with the statuses
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
        },
        {
          find: function(status, friendship ){
            return Comments.find({ statusId: status._id });
          },

          children: [
            {
              find: function(comment, status, friendship) {
                return Images.find({ owner: comment.owner, isProfileImage: true
                });
              }
            }
          ]
        },
        {
          find: function (status, friendship) {
            return Images.find({ owner: status.owner, isProfileImage: true });
          }
        }
      ]
    }
  ]
});

/**
* Return all images with a particular album
*/

Meteor.publishComposite('photosByAlbum', function (name) {
  return {
    find: function () {
      return Albums.find({ owner: this.userId, name });
    },
    children: [
      {
        find: function (album) {
          return Images.find({ albumId: album._id, owner: this.userId, albumName: name})
        }
      }
    ]
  }
})
