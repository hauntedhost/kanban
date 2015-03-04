Kanban.ListController = Ember.ObjectController.extend({
  cardCount: function() {
    return this.get('cards.length');
  }.property('cards.@each')
});
