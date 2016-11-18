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
