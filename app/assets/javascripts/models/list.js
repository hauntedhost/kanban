Kanban.Models.List = Backbone.RelationalModel.extend({
	urlRoot: "/api/lists",

	relations: [{
		type: Backbone.HasMany,
		key: "cards",
		relatedModel: "Kanban.Models.Card",
		collectionType: "Kanban.Collections.Cards",
		reverseRelation: {
			key: "list"
		}
	}],

  // initialize: function () {
  // 	var cards = this.get("cards");
  // 	this.set({ cards: new Kanban.Collections.Cards(cards) });
  // },

  // parse: function (data) {
		// data.cards = new Kanban.Collections.Cards(data.cards);
		// return data;
  // },

  cards: function () {
    return this.get("cards");
  }

});
