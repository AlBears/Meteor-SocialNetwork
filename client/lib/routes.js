FlowRouter.route('/', {
  name: 'home',
  action () {
    BlazeLayout.render('fullLayout', {main: 'heroUnit' });
  }
});

//check if user logged in to restrict access to signup and login
let loggedCheck = [
  () => { if (Meteor.userId()){FlowRouter.go('dashboard')}}
];

FlowRouter.route('/signup', {
  name: 'signup',
  action () {
    BlazeLayout.render('fullLayout', {main: 'signup'});
  },
  triggersEnter: loggedCheck
});

FlowRouter.route('/login', {
  name: 'login',
  action () {
    BlazeLayout.render('fullLayout', {main: 'login'});
  },
  triggersEnter: loggedCheck
});
//user group -> we restrict access for not registered
let userRoutes = FlowRouter.group({
  prefix: '/user',
  name: 'userRoutes',
  triggersEnter: [
    () => { if (!Meteor.userId()){FlowRouter.go('home')}}
  ]
})

//Dashboard route
userRoutes.route('/dashboard', {
  name: 'dashboard',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'dashboard'
    });
  }
});

//Find users route
userRoutes.route('/findUsers', {
  name: 'findUsers',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'findUsers'
    });
  }
});

//Define edit user profile route
userRoutes.route('/profile', {
  name: 'profile',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'userProfile'
    });
  }
});

//Define the route to manage albums
userRoutes.route('/albums', {
  name: 'albums',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'albums'
    });
  }
});

//Define the route to upload photos
userRoutes.route('/photos', {
  name: 'photos',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'photos'
    });
  }
});

//Define the route to upload photos
userRoutes.route('/photos/album/:name', {
  name: 'photosByAlbum',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'photosByAlbum'
    });
  }
});
/** Define public route for user profile */
FlowRouter.route('/public/profile/:username', {
  name: 'publicProfile',
  action () {
    BlazeLayout.render('fullLayout', { main: 'publicProfile' });
  }
});
/** Define public route for user album */
FlowRouter.route('/public/:username/album/:name', {
  name: 'publicAlbum',
  action () {
    BlazeLayout.render('fullLayout', { main: 'publicAlbum' });
  }
})
