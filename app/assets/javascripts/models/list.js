Kanban.Models.List = Backbone.Model.extend({
	urlRoot: "/api/lists",

  initialize: function () {
  	var cards = this.get("cards");
  	this.set({ cards: new Kanban.Collections.Cards(cards) });

  	// ========================================

  	// var cards;
   //  var cardsData = this.get("cards");

   //  if (cardsData) {
			// cards = new Kanban.Collections.Cards(cardsData);
   //  } else {
   //  	console.log("no card data");
   //  	cards = new Kanban.Collections.Cards();
   //  	console.log(cards);
   //  };

   //  this.set({ cards: cards });
  },

  parse: function (data) {
		data.cards = new Kanban.Collections.Cards(data.cards);
		return data;
  },

  cards: function () {
    return this.get("cards");
  }

});
