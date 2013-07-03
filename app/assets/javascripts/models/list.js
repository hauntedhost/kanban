Kanban.Models.List = Backbone.Model.extend({
	urlRoot: "/api/lists",

  initialize: function () {
  	var cards = this.get("cards");
  	this.set({ cards: new Kanban.Collections.Cards(cards) });
  },

  parse: function (data) {
		data.cards = new Kanban.Collections.Cards(data.cards);
		return data;
  },

  cards: function () {
    return this.get("cards");
  }

});
