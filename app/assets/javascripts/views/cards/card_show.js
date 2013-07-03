Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card_detail",

  events: {
    "submit #add_comment": "addComment",
  },

  addComment: function (event) {
  	event.preventDefault();

  	var cardId = parseInt($(event.target).data("card-id"));
  	console.log("add comment");
  	console.log("card-id #" + cardId);
  },

  render: function () {
  	var that = this;

  	var card = that.model;
  	var renderedContent = that.template({
  		card: card
  	});

  	that.$el.html(renderedContent);
  	return that;
  }

});
