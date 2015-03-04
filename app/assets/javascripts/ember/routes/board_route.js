Kanban.BoardRoute = Ember.Route.extend({
  actions: {
    showModal: function(modalName, model) {
      this.controllerFor(modalName).set('model', model);
      this.render(modalName, {
        into: 'board',
        outlet: 'modal',
      });
    },

    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'board'
      });
    }
  }
});
