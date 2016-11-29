Template.photos.onCreated(function() {
  this.autorun(() => {
    this.subscribe('albums');
  });
  Session.set('uploadStatus', '');
});

Template.photos.onRendered(() => {
  $("#dropzone").hide();
})

Template.photos.helpers({
  'albums' () { return Albums.find(); },
  'uploadStatus' () {
    if (Session.get('uploadStatus')) {
      return Session.get('uploadStatus');
    }
  }
});

Template.photos.events({
  'change #selectAlbum' (event) {
    if ($(event.target).val()) {
      $("#dropzone").fadeIn();
    } else {
      $("#dropzone").fadeOut();
    }
  },

  'dropped #dropzone' (event) {
    let albumId = $("#selectAlbum").val(),
        albumName = $("#selectAlbum option:selected").text();

    FS.Utility.eachFile(event, (file) => {
      Images.insert(file, (error, fileObj) => {
        if (error) {
          console.log(error);
          Session.set('uploadStatus', 'There was an error');
        } else {
          Images.update({ _id: fileObj._id }, {
            $set: {
              owner: Meteor.userId(),
              username: Meteor.user().username,
              albumId,
              albumName
            }
          });
          Session.set('uploadStatus', 'Everything went OK');
        }
      });
    });
  }
});
