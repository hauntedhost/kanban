Kanban.Models.Card = Backbone.RelationalModel.extend({
	urlRoot: "/api/cards",

  // initialize: function () {
  // 	var that = this;
  // 	var cardComments = this.get("cards");
  // 	// var cardId = that.get("id");
  // 	that.set({ cardComments: new Kanban.Collections.CardComments(cardComments) });
  // },

});
