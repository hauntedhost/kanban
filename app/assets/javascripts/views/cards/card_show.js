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

		// add board_id to attrs, create new list
		// attrs.list.board_id = board.id;
		var cardComment = new Kanban.Models.CardComment();	

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
  	var comments = card.get("comments");
  	console.log(comments);

  	// var list = card.get("list");
  	// var board = list.get("board");

  	console.log("card show:");
  	var renderedContent = that.template({
  		card: card,
  		comments: comments
  		// comments: comments
  	});

  	that.$el.html(renderedContent);
  	return that;

  	// var cardComments = new Kanban.Collections.CardComments();
  	// cardComments.fetch({
  	// 	cardId: card.id,
  	// 	success: function (comments) {

  	// 		console.log(comments);
  	// 		// card.reset(comments);
  	// 		// console.log(comments);

		 //  	var renderedContent = that.template({
		 //  		card: card,
		 //  		comments: comments
		 //  	});

		 //  	that.$el.html(renderedContent);
		 //  	return that;
  	// 	}
  	// });

  	// console.log(comments;)

  	// var comments = comments.fetch(card.id);

  	// var comments = card.fetch("comments");
  	// var comments = card.get("comments").fetch();
  	// console.log(comments);

  }

});
