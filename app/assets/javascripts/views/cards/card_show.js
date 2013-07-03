Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card-show",

  events: {
    "submit #add_comment": "addComment",
  },

  addComment: function (event) {
  	event.preventDefault();

  	console.log("add comment");
		console.log(event.target);  	
  	var cardId = parseInt($(event.target).data("card-id"));
  	console.log("card-id #" + cardId);
  },

  render: function () {
  	var that = this;

  	console.log("render that:")
  	console.log(that);

  	var card = that.model;
  	var renderedContent = that.template({
  		card: card
  	});

  	that.$el.html(renderedContent);
  	return that;
  }

});
