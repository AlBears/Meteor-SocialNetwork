Template.listStatuses.onCreated(function(){
  this.autorun(() => {
    this.subscribe('userStatuses');
  });
});

Template.listStatuses.helpers({
/* All statuses in descending order*/
  'statuses' () {return Statuses.find({}, { sort : { createdAt: -1} });}
});
