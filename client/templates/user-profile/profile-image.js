Template.profileImage.onCreated(function () {
  this.autorun( () => {
    this.subscribe('profileImage');
  });
});

Template.profileImage.helpers({
  'profileImage' () {
    let imageId = Meteor.user().profile.meta.profileImage;
    return Images.findOne( { _id: imageId });
  }
});

Template.profileImage.events({
  'change input[name="profileImage"]' (event) {
    event.preventDefault();

    if (Meteor.user().profile.meta.profileImage){
      Images.remove({ _id: Meteor.user().profile.meta.profileImage });
    }

    FS.Utility.eachFile(event, (file) => {
      Images.insert(file, (error, fileObj) => {
        if (error) { console.log(error); }
        else {
          let userId = Meteor.userId(),
              imageId = fileObj._id;

          Meteor.users.update({ _id: userId }, {
            $set: {
              "profile.meta.profileImage": imageId
            }
          });

          Images.update({ _id: imageId }, {
            $set: {
              owner: userId,
              username: Meteor.user().username,
              isProfileImage: true
            }
          })
        }
      });
    });
  }
});
