Meteor.methods({
  'albums.add' (album) {
    if(!this.userId){throw new Meteor.Error(401, 'You must be logged in'); }
    check(album, String);
    Albums.insert({ name: album });
  }
});
