FlowRouter.route('/', {
  name: 'home',
  action () {
    BlazeLayout.render('fullLayout', {main: 'heroUnit' });
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action () {
    BlazeLayout.render('fullLayout', {main: 'signup'});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action () {
    BlazeLayout.render('fullLayout', {main: 'login'});
  }
});
