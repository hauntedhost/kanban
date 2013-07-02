Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card-show",

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
