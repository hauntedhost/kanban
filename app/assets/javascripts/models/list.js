Kanban.Models.List = Backbone.Model.extend({
  initialize: function () {
    // console.log("initialize list");
    var cards = this.get("cards");
    this.set({ cards: new Kanban.Collections.Cards(cards) });
  },

  cards: function () {
    return this.get("cards");
  }

  // parse: function (data) {
  //   data.cards = new Kanban.Collections.Cards(data.cards);
  //   return data;
  // }
});
