Kanban.Models.List = Backbone.Model.extend({
  initialize: function () {
    var cards = this.get("cards");
    this.set({ cards: new Kanban.Collections.Cards(cards) });
  },

  cards: function () {
    return this.get("cards");
  }

});
