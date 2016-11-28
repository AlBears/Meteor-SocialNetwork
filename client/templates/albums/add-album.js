Template.addAlbum.onCreated(() => {
  Session.set('error', '');
});

Template.addAlbum.events({
  'submit form' (event) {
    event.preventDefault();
    let album = event.target.newAlbum.value;

    if (!_.isEmpty(album)) {
      /**Call method to save a new album*/
      Meteor.call('albums.add', album);
      event.target.newAlbum.value = '';
      Session.set('error', '');
    } else {
      Session.set('error', 'The album name cannot be blank');
    }
  }
});

Template.addAlbum.helpers({
  'haveErrors' () {
    if (Session.get('error')) {
      return Session.get('error');
    }
  }
})
