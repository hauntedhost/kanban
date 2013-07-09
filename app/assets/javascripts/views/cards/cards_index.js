Kanban.Views.CardsIndex = Backbone.View.extend({
	template: JST['cards/index'],
	tagName: "div",
  // className: "cards",

	initialize: function () {
		var that = this;
		// that.model.get("cards").on("all", that.render, that);
		// that.collection.on("all", that.render, that);
		// that.$el.attr("id", "cards_list_" + that.collection.list.id);
	},

	render: function () {
		var that = this;
  	var renderedContent = that.template({
  		cards: that.collection
  	});

  	that.$el.html(renderedContent);

		return that;
	}

});