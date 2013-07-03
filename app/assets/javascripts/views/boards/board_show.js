Kanban.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  tagName: "section",
  className: "board-show",

  initialize: function () {
    var that = this;

    that.model.on('reset', this.render, this);
    // that.model.on('', this.render, this);
  },

  events: {
    "click div.card": "cardClick",
    "submit #add_list": "addList"
  },

  addList: function (event) {
  	var that = this;

    var board = that.model;
  	event.preventDefault();

  	console.log("add list");

  	console.log("current board:")
  	console.log(board);

  	// get attrs and reset form
  	var $form = $(event.target);
		var attrs = $form.serializeJSON();
		$form[0].reset();

		// add board_id to attrs
		attrs.list.board_id = board.id;
		// attrs.cards = {};
		// console.log(attrs);

		// create new list
  	console.log("list");
		var list = new Kanban.Models.List(attrs.list);
		console.log(list);

		list.save(attrs.list, {
			success: function (data) {
				console.log("list saved");

				// add list to board				
				var lists = board.lists();
				lists.add(list);

		  	console.log("board");
				console.log(board);
				board.trigger("reset");
			}
		});

		// that.collection.add(that.model);
		// that.model.save(attrs,
		// 	{ success: function (data) {
		// 		console.log('la collection: ')
		// 		console.log(that.model.collection);

		// 		var url = "/posts/" + data.id;
		// 		Backbone.history.navigate(url, true);
		// 	}
		// });

		// debugger;
  },

  cardClick: function (event) {
  	var that = this;

    var board = that.model;
    event.stopPropagation();

    var cardId = parseInt($(event.target).data("card-id"));    
    var $cardModal = that.$el.find("section.card_detail");

    var card = board.getCard(cardId);
    var cardShow = new Kanban.Views.CardShow({
      model: card
    });

  	$cardModal.html(cardShow.render().$el);
  	$cardModal.find("article.card_detail").modal();
  },

  render: function () {
    var that = this;

    console.log("render board");

    var board = that.model;
    var lists = that.model.lists();
    var renderedContent = that.template({
      board: board,
      lists: lists,
    });

    that.$el.html(renderedContent);
    return that;
  }

});
