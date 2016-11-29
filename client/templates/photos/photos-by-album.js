Template.photosByAlbum.onCreated(function () {
  this.autorun(() => {
    let name = FlowRouter.getParam('name');
    this.subscribe('photosByAlbum', name);
  });
});

Template.photosByAlbum.helpers({
  'photos' () { return Images.find(); },
  'albumName' () { return FlowRouter.getParam('name'); }
});

Template.photosByAlbum.events({
  'click button[data-action="removeImage"]'() {
    Images.remove({ _id: this._id });
  }
});
