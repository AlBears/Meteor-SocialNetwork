Meteor.methods({
  'albums.add' (album) {
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(album, String);
    Albums.insert({ name: album });
  },
  'albums.remove' (albumId) {
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(albumId, String);
    Albums.remove({ _id: albumId, owner: this.userId });
  },
  'albums.toggleStatus' (albumId, status) {
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(albumId, String);
    check(status, Boolean);
    Albums.update({ _id: albumId }, { $set: { isPublic: status } });
  }
});
