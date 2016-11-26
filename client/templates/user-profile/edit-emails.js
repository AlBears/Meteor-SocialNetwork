Template.editEmails.helpers({
  /**Check if an email is the primary email of the logged in user*/
  'isPrimaryEmail' () {
    return this.address === Meteor.user().profile.meta.primaryEmail ? true : false;
  }
});

Template.editEmails.events({
  'submit form' (event){
    event.preventDefault();

    let newEmail = event.target.addEmail.value;

    if (!_.isEmpty(newEmail)){
      /** Call method to add a new email and send the email address*/
      Meteor.call('profile.addEmail', newEmail, (error, result) => {
        if (error) { console.log(error.reason );}
        else { event.target.addEmail.value = ''; }
      });
    }
  }
})
