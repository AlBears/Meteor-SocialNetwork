Template.publicProfile.onCreated(function () {
  let username = FlowRouter.getParam('username');
  this.autorun(() => {
    this.subscribe('public.identifyUser', username);
  });
});

Template.publicProfile.helpers({
  'username' () { return FlowRouter.getParam('username'); },
  'haveData' () { return Meteor.users.find().count() === 1 ? true : false; },
  'user' () {
    let username = FlowRouter.getParam('username');
    return Meteor.users.findOne({ username });
  },
  'profileImage' () {
    let username = FlowRouter.getParam('username');
    return Images.findOne({ username });
  },
  'albums' () { return Albums.find(); }
});
