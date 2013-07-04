Kanban.Collections.CardComments = Backbone.Collection.extend({
  model: Kanban.Models.CardComment,

  initialize: function (models, options) {
  	var that = this;
  	that.cardId = options.cardId;
  },

  url: function () {
  	var that = this;
  	return "/api/cards/" + that.cardId + "/card_comments";
  }
});
