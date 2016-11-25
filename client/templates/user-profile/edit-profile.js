Template.editProfile.onRendered(() => {
    $('#birthday').datepicker({
        autoclose: true,
        format: 'dd M yyyy'
    });

    Session.set('usernameError', '');
});

Template.editProfile.events({
    'submit form' (event) {
        event.preventDefault();

        //Get form values
        let firstName = event.target.firstName.value,
            lastName = event.target.lastName.value,
            username = event.target.username.value,
            location = event.target.location.value,
            birthday = event.target.birthday.value,
            updates = {};

          //Validation
          if (!_.isEmpty(firstName)) { updates.firstName = firstName; }
          if (!_.isEmpty(lastName)) { updates.lastName = lastName; }
          if (!_.isEmpty(location)) { updates.location = location; }
          if (!_.isEmpty(birthday)) { updates.birthday = new Date(birthday); }

          if (!_.isEmpty(username) && username !== Meteor.user().username) {
            updates.username = username;
          }

          updates.isPublicProfile = $(event.target.isPublicProfile).is(':checked');

          Meteor.call('profile.update', updates, (error, result) => {
            if (error) { Session.set('usernameError', error.reason); }
          } );

          Session.set('usernameError', '');

    }
});

Template.editProfile.helpers({
  'usernameTaken' () {
    if (Session.get('usernameError')) {
      return Session.get('usernameError');
    }
  }
})
