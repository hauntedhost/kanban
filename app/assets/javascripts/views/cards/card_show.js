Kanban.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: "article",
  className: "card_detail",

  events: {
    "submit form#add_comment": "addComment",
  },

  addComment: function (event) {
  	event.preventDefault();

  	var cardId = parseInt($(event.target).data("card-id"));
  	console.log("add comment");
  	console.log("card-id #" + cardId);

  	// get form attrs, reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

		var card = Kanban.boards.getCard(cardId);
		console.log(card);

		var comment = Kanban.boards.getCard(cardId);
		console.log(card);

		// add board_id to attrs, create new list
		// attrs.list.board_id = board.id;
		// var list = new Kanban.Models.List();	

		// // save list
		// list.save(attrs.list, {
		// 	success: function (data) {
		// 		var lists = board.lists();
		// 		lists.add(list);
		// 		board.trigger("add");
		// 	}
		// });
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
