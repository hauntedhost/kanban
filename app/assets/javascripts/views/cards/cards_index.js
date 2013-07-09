Kanban.Views.CardsIndex = Backbone.View.extend({
	template: JST['cards/index'],

	initialize: function () {
		var that = this;
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