Kanban.Models.List = Backbone.Model.extend({
	urlRoot: "/api/lists",

  initialize: function () {
  	var cards;
    var cardsData = this.get("cards");

    console.log("list init. cards:");
    console.log(cardsData);

    if (cardsData) {
			cards = new Kanban.Collections.Cards(cardsData);
    } else {
    	cards = new Kanban.Collections.Cards();
    };

    console.log("cards");
    console.log(cards);

    this.set({ cards: cards });
  },

  cards: function () {
    return this.get("cards");
  }

});
