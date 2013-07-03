Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card-show",

  events: {
    "click button": "addComment",
  },

  addComment: function (event) {
  	event.preventDefault();
  	console.log("add comment")
  	console.log(event);
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
