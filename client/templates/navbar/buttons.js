Template.navButtons.onCreated(function () {
  this.autorun(() => {
    this.subscribe('events');
  });
});

Template.navButtons.events({
  'click a[data-action="logout"]'() {
    AccountsTemplates.logout();
  }
});
