Template.editEmails.helpers({
  /**Check if an email is the primary email of the logged in user*/
  'isPrimaryEmail' () {
    return this.address === Meteor.user().profile.meta.primaryEmail ? true : false;
  }
})
