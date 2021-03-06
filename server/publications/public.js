/**
* Returns the user data, the profile image and public albums
*/
Meteor.publishComposite('public.identifyUser', function(username){
  return {
    find: function() {
      return Meteor.users.find(
        { username, "profile.meta.isPublicProfile": true },
        { fields: { profile: 1, username: 1} }
      );
    },

    children: [
      {
        find: function (user) {
          return Images.find(
            { username, isProfileImage: true },
            { fields: { isProfileImage: 1, username: 1, "copies.images.key": 1 }}
          );
        }
      },
      {
        find: function (user) {
          return Albums.find(
            { username, isPublic: true },
            { fields: { username: 1, name: 1 } }
          );
        }
      }
    ]
  }
});
/**
* Returns all images associated with an album
*/
Meteor.publishComposite('public.getAlbumPhotos', function (username, albumName){
  return {
    find: function () {
      return Meteor.users.find(
        { username, 'profile.meta.isPublicProfile': true },
        { fields: { profile: 1, username: 1 } }
      );
    },

    children: [
      {
        find: function (user) {
          return Albums.find(
            { username, isPublic: true, name: albumName },
            { fields: { username: 1, name: 1 } }
          );
        },

      children: [
        {
          find: function (album, user) {
            return Images.find(
              { albumId: album._id },
              { fields: { isProfileImage: 1, username: 1, "copies.images.key": 1 } }
            );
          }
        }
      ]
      }
    ]
  }
});
