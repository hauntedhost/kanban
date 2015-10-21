Kanban.Collections.Cards = Backbone.Collection.extend({
  model: Kanban.Models.Card,
  url: '/api/cards',

  comparator: function (card) {
    return card.get('position');
  }
});
