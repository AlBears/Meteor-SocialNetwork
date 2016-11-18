Template.addStatus.onCreated(() => {
  /** Initialize the error session variable*/
  Session.set('error', '');
});

Template.addStatus.events({
  'submit form'(event){
    event.preventDefault();
    let status = event.target.status.value;

    if(!_.isEmpty(status)){
      //call method
      event.target.status.value = '';
      Session.set('error', '');
    } else {
      Session.set('error', 'The status cannot be blank');
    }
  }
});
/**
* check to see if there are errors and if yes return message
*/
Template.addStatus.helpers({
  'haveErrors'() {
    if (Session.get('error')){ return Session.get('error');}
  }
});
