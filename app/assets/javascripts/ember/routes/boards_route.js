Kanban.BoardsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('board');
  }
});
