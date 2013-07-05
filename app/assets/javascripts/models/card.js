Kanban.Models.Card = Backbone.RelationalModel.extend({
	urlRoot: "/api/cards",

	relations: [{
		type: Backbone.HasMany,
		key: "comments",
		relatedModel: "Kanban.Models.CardComment",
		collectionType: "Kanban.Collections.CardComments",
		reverseRelation: {
			key: "card"
		}
	}],

	// fetchComments: function () {
	// 	var that = this;
	// 	var cardId = that.id;

	// 	console.log("card fetchComments:");
 //  	var cardComments = new Kanban.Collections.CardComments();
 //  	var comments = cardComments.fetch({ cardId: cardId });

 //  	return comments;
	// }

  // initialize: function () {
  // 	var that = this;
  // 	var cardComments = this.get("cards");
  // 	// var cardId = that.get("id");
  // 	that.set({ cardComments: new Kanban.Collections.CardComments(cardComments) });
  // },

});
