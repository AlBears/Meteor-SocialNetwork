Template.activity.onCreated(function () {
  this.autorun(() => {
    this.subscribe('requests');
  });
});
