UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.firstName', 'profile.lastName'],
  engine: new EasySearch.MongoDB({
    selector: function(searchObject, options, aggregation){
      let selector = this
      .defaultConfiguration()
      .selector(searchObject, options, aggregation);
      let userFilter = {};

      userFilter.$ne = options.search.userId;
      selector._id = userFilter;

      return selector;
    }
  })
});
