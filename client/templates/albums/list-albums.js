Template.listAlbums.onCreated(function () {
  this.autorun(() => {
    this.subscribe('albums');
  });
});

Template.listAlbums.helpers({
  'albums' () { return Albums.find(); }
});

Template.listAlbums.events({
  /**Toggle status of album*/
  'click button[data-action="toggleStatus"]' () {
    Meteor.call('albums.toggleStatus', this._id, !this.isPublic );
  },
  /**Remove album*/
  'click button[data-action="removeAlbum"]' () {
    Meteor.call('albums.remove', this._id );
  }
});
