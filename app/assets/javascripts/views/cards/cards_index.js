Kanban.Views.CardsIndex = Backbone.View.extend({
	template: JST['cards/index'],

	initialize: function () {
		var that = this;
	},

	render: function () {
		var that = this;
		var cards = that.collection;
  	var renderedContent = that.template({
  		cards: cards
  	});

  	that.$el.html(renderedContent);

		// droppable board members to card assignee
    var $assignees = that.$("div.card");
    $assignees.droppable({
			accept: "li.user",
    	drop: function (event, ui) {
				// get data-ids
				var user_id = ui.draggable.data("user-id");
				var card_id = $(event.target).data("card-id");

				// lookup related models
				var card = cards.get(card_id);
				var board = card.get("list").get("board");      // OPTIMIZE: refactor
				var user = board.get("users").get(user_id);     // reaching to far

				console.log("received user " + user_id + " on card " + card_id + " : " + card.get("title"));

				card.set({assignee: user});
    	}
    });

		return that;
	}

});