FlowRouter.route('/', {
  name: 'home',
  action () {
    BlazeLayout.render('fullLayout', {main: 'heroUnit' });
  }
});
